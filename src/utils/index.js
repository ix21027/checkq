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
