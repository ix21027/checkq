// Local (no-backend) reimplementation of the checkq-api endpoints.
// Data and logic are ported from the Rails API (foegit/checkq-api):
//   GET  subjects  -> Api::SubjectsController + SubjectDecorator
//   POST test      -> Task::TestGenerator / Task::QuestionParser
//   POST answer    -> Answer::Result / Answer::AnswerChecker
//   GET  bank      -> Api::BanksController + QuestionDecorator(bank_json)
//   POST session   -> Session::SessionAuthorizer  (faked client-side)
//   POST profile   -> Api::ProfilesController      (faked client-side)
// The correct answer of a question is its first answer (see DataBase::Seeder).

import data from './data.json';

// ---- lookups ----
const subjectById = new Map(data.subjects.map(s => [s.id, s]));
const questionIndex = new Map();
data.subjects.forEach(s => {
  s.questions.forEach(q => questionIndex.set(q.id, { question: q, subject: s }));
});

function correctAnswer(question) {
  return question.answers.find(a => a.correct) || question.answers[0];
}

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function apiError(message) {
  const error = new Error(message);
  error.isApiError = true;
  return error;
}

// ---- endpoints ----
function getSubjects() {
  return data.subjects.map(s => ({
    id: s.id,
    name: s.name,
    question_count: s.questions.length,
  }));
}

// mirrors Task::TestGenerator validation + Task::QuestionParser distribution
function createTest(payload) {
  const test = payload.test || {};
  const subjectIds = test.subject_ids || [];
  const count = parseInt(test.question_count, 10);

  const subjects = subjectIds.map(id => subjectById.get(id));
  if (!subjectIds.length || subjects.some(s => !s)) {
    throw apiError('subject is not found in this life');
  }
  if (!(count >= subjectIds.length) || count > 60) {
    throw apiError('question_count is invalid');
  }

  const per = Math.floor(count / subjects.length);
  const remainder = count - per * subjects.length;

  let picked = [];
  subjects.forEach((subject, i) => {
    const take = per + (i === subjects.length - 1 ? remainder : 0);
    picked = picked.concat(shuffle(subject.questions).slice(0, take));
  });

  return shuffle(picked).map(q => ({
    id: q.id,
    question: q.question,
    options: q.answers.map(a => ({ id: a.id, title: a.title })),
  }));
}

// mirrors Answer::AnswerChecker: return the correct answer id per question
function createAnswer(payload) {
  const result = (payload.answer && payload.answer.result) || [];
  return result.map(item => {
    const entry = questionIndex.get(item.id);
    return {
      id: item.id,
      id_answer: entry ? correctAnswer(entry.question).id : null,
    };
  });
}

// mirrors QuestionDecorator with context bank_json: true
function getBank() {
  const bank = [];
  data.subjects.forEach(s => {
    s.questions.forEach(q => {
      bank.push({
        question_id: q.id,
        subject_id: s.id,
        question_name: q.question,
        answer_name: correctAnswer(q).title,
      });
    });
  });
  return bank;
}

// ---- auth (client-side fake; the backend seeds no users) ----
const USERS_KEY = 'checkq_local_users';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function createProfile(payload) {
  const user = payload.user || {};
  const email = String(user.email || '').toLowerCase();

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw apiError('email is invalid');
  if (!user.username || user.username.length < 3) throw apiError('username is invalid');
  if (!user.password) throw apiError('password is invalid');
  if (user.password_confirmation !== undefined && user.password !== user.password_confirmation) {
    throw apiError("password confirmation doesn't match");
  }

  const users = loadUsers();
  if (users[email]) throw apiError('email has already been taken');

  const id = Object.keys(users).length + 1;
  users[email] = { id, email: user.email, username: user.username, password: user.password };
  saveUsers(users);

  return { id, email: user.email, username: user.username, state: 1, rate: 0 };
}

function createSession(payload) {
  const session = payload.session || {};
  const email = String(session.email || '').toLowerCase();
  const user = loadUsers()[email];

  if (!user || user.password !== session.password) throw apiError('password is invalid');

  return { user_auth_token: btoa(`${email}:${Date.now()}`) };
}

// ---- router (mimics the axios instance interface) ----
export function request(method, url, body) {
  const path = String(url).replace(/^\/+|\/+$/g, '');
  let payload = {};
  if (body != null) payload = typeof body === 'string' ? JSON.parse(body) : body;

  return new Promise((resolve, reject) => {
    // async to keep loading states consistent with the original axios calls
    setTimeout(() => {
      try {
        let result;
        switch (`${method} ${path}`) {
          case 'GET subjects': result = getSubjects(); break;
          case 'POST test': result = createTest(payload); break;
          case 'POST answer': result = createAnswer(payload); break;
          case 'GET bank': result = getBank(); break;
          case 'POST profile': result = createProfile(payload); break;
          case 'POST session': result = createSession(payload); break;
          case 'DELETE session': result = null; break;
          default: throw apiError(`Unknown endpoint: ${method} ${path}`);
        }
        resolve({ data: result });
      } catch (error) {
        reject(error);
      }
    }, 0);
  });
}
