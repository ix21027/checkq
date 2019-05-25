import fecthStatus from '@/constants/fetchStatus'
import testsMock from '@/mocks/questions'
import Vue from 'vue'
// import axios from 'axios';

const testsStore = {
  state: {
    list: [],
    currentNumber: 0,
    currentTime: '00:00',
    fetchStatus: fecthStatus.failed,
    countPassed: 0,
    passingProcess: true,
    testTime: 0
  },
  mutations: {
    successToFetchTests(state, payload) {
      state.list = payload.testsList;
      state.currentNumber = 0
      state.fetchStatus = fecthStatus.success;
    },
    startToFetchTests(state) {
      state.fetchStatus = fecthStatus.start;
    },
    failToFetchTests(state) {
      state.fetchStatus = fecthStatus.failed;
    },
    changeCurrentNumber(state,payload){
      if(payload.currentNumber < state.list.length && payload.currentNumber >= 0){
        state.currentNumber = payload.currentNumber
      }
    },
    setAnswer(state,payload){
      Vue.set(state.list,payload.index,{...state.list[payload.index], answer:payload.answer })
    },
    setCountPassed(state,payload){
      state.countPassed = payload.count;
    },
    setCurrentTime(state,payload){
      state.currentTime = payload.time
    },
    setTestTime(state,payload){
      state.testTime = payload.end
    },
    stopTestTime(state){
      state.passingProcess = false
    }
  },
  actions: {
    async fetchTests({ commit }) {
      commit('startToFetchTests');

      await setTimeout(()=>{
        commit('successToFetchTests',{testsList:testsMock});
      },2000)
      // const headers = {
      //   'Content-type': 'application/json',
      //   'Accept': 'application/json'
      // }

      // try {
      //   const data = await axios.get('https://checkq-api.herokuapp.com/api/subjects', {
      //     headers
      //   });
      //   commit('successToFetchTests', {
      //     testsList: data.data,
      //   })
      // } catch (error) {
      //   commit('failedToFetchTests', { error })
      // }
    },
    async fetchTime({ commit, state }){
      var diff,
          startTime = new Date().getTime();

      while(state.passingProcess){
        diff = new Date().getTime() - startTime
        commit('setCurrentTime',{ time: display(diff) })
        await sleep(1000)
      }
      commit('setTestTime',{end:diff})
    },
  }
};
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
function display(ms) {
  var seconds = Math.floor(ms/1000)
  var minutes = Math.floor(seconds/60)
  var hours = Math.floor(minutes/60)
  seconds %= 60
  minutes %= 60
  var str =''+(hours > 0? hours+':':'')
  str += ( minutes === 0) ? '00' : ((minutes < 10 && minutes > 0 ) ?'0'+minutes : minutes)
  str+=':'
  str += ( seconds === 0 ) ? '00' : ((seconds < 10 && seconds > 0 ) ? '0'+seconds : seconds)
  return str;
}
export default testsStore;