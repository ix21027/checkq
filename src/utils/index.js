import Katex from 'katex';


export function formatTime (ms) {
  let seconds = Math.floor(ms / 1000)
  let minutes = Math.floor(seconds / 60)
  let hours = Math.floor(minutes / 60)
  seconds %= 60
  minutes %= 60
  let str = '' + (hours > 0 ? hours + ':' : '')
  str += (minutes === 0) ? '00' : ((minutes < 10 && minutes > 0) ? '0' + minutes : minutes)
  str += ':'
  str += (seconds === 0) ? '00' : ((seconds < 10 && seconds > 0) ? '0' + seconds : seconds)

  return str
}


export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function rand(min, max) {
  const size = max - min;
  const value = Math.floor(Math.random() * (size + 1)) + min;

  return value;
}

export function randSelect(number, array) {
  const deleteNumber = array.length - number;
  const randArray = [...array];

  for (let i = 0; i < deleteNumber; i += 1) {
    const index = rand(0, array.length - 1);
    randArray.splice(index, 1);
  }

  return randArray;
}

export function renderFormula(expression) {
  const chank = expression.split('$') || '';
  let html = '';
  for (let i = 0; i < chank.length; i += 2) {
    html += `<span>${chank[i] || ''}</span> ${Katex.renderToString(chank[i + 1] || '', {
      throwOnError: false,
      strict: 'ignore',
    })}`
  }
  return html;
}