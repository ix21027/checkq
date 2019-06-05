import { http} from '@/fetchapi';
import fecthStatus from '@/constants/fetchStatus'
import { formatTime, shuffle } from '@/utils'
import Vue from 'vue'

const testsStore = {
  state: {
    list: [],
    currentNumber: 0,
    fetchStatus: fecthStatus.failed,
    countPassed: 0,
    startTime: null,
    endTime: null,
    stringTime: '',
    testStatus: false, // false если тест пройден.
  },
  mutations: {
    successToFetchTests(state, payload) {
      state.list =[...payload.testsList]
      state.currentNumber = 0
      state.countPassed = 0
      state.startTime = null
      state.endTime = null
      state.stringTime = ''
      state.testStatus = false
      state.fetchStatus = fecthStatus.success
    },
    startToFetchTests(state) {
      state.fetchStatus = fecthStatus.start;
    },
    failToFetchTests(state) {
      state.fetchStatus = fecthStatus.failed;
    },
    changeCurrentNumber(state, payload){
      if(payload.currentNumber < state.list.length && payload.currentNumber >= 0){
        state.currentNumber = payload.currentNumber
      }
    },
    setAnswer(state, payload){
      Vue.set(state.list,payload.index,{...state.list[payload.index], answer:payload.answer })
    },
    setCountPassed(state, payload){
      state.countPassed = payload.count;
    },
    setStartTime(state, payload){
      state.startTime = payload.time
    },
    setEndTime(state, payload){
      state.endTime = payload.time
    },
    setStringTime(state, payload){
      state.stringTime = payload.time
    },
    setTestStatus(state, payload){
      state.testStatus = payload.status
    },
    successToFetchTestResult(state, payload){
      //сращиваем два массива в один и записываем его в list
      state.list = [...state.list.map((i)=>{
        i.server_answer = payload.list.find((item) => item.id === i.id).id_answer
        return i
      })]
    },
  },
  actions: {
    async fetchTests({ commit }, payload) {
      const ctx = { title: 'test' }
      try {
        commit('startToFetchTests')
        commit('startLoading', ctx, { root: true })

        const jsonData = JSON.stringify({test: {
          subject_ids: payload.categories,
          question_count: payload.testCount
        }});

        const response = await http.post('test', jsonData);

        let testsList = response.data.map(t => ({  ...t, options: shuffle(t.options) }));
        testsList = shuffle(testsList);

        commit('successToFetchTests', { testsList });
      } catch (error) {
        commit('errorOccured', { error }, { root: true });
      } finally {
        commit('stopLoading', ctx, { root: true });
      }
    },

    async fetchResult({commit, state}){
      const ctx = { title: 'result' };
      try {
        commit('startLoading', ctx, { root: true });
        const userAnswer = {
          result: state.list.map((i)=>({
            id: i.id,
            answer_id: i.answer || null
          }))
        }
        const jsonData = JSON.stringify({answer: userAnswer});
        const response = await http.post('answer', jsonData);
        commit('successToFetchTestResult', { list: response.data });
        commit('setEndTime', { time: new Date().getTime()});
        commit('setStringTime', { time: formatTime(state.endTime - state.startTime)});
        commit('setTestStatus', { status: true });
        const parsed = JSON.stringify(state.list)
        const t = JSON.stringify(state.stringTime)
        localStorage.setItem('testTime',t)
        localStorage.setItem('testResult', parsed)
      } catch (err) {
        commit('errorOccured', { error: err }, { root: true });
      } finally {
        commit('stopLoading', ctx, { root: true });
      }
    },

    async Report({state},payload){
      let question = {}
      question.message = payload.mess
      question.test = state.list[state.currentNumber]
    }
  }
};
export default testsStore;