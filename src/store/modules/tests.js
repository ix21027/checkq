import fecthStatus from '@/constants/fetchStatus'
import testsMock from '@/mocks/questions'
import resultTest from '@/mocks/resultTest'
import { formatTime } from '@/utils'
import Vue from 'vue'
// import axios from 'axios';

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
      state.list =[...payload.testsList];
      state.currentNumber = 0
      state.fetchStatus = fecthStatus.success;
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
    }
  },
  actions: {
    async fetchTests({ commit }) {
      commit('startToFetchTests');
      commit('changeCurrentNumber',{ currentNumber: 0})
      commit('setCountPassed',{ count: 0})
      commit('setStartTime',{ time: null})
      commit('setEndTime',{ time: null})
      commit('setTestStatus',{status: false})
      commit('startLoadResource', null, { root: true });
      try {
        setTimeout(() => {
          commit('successToFetchTests', { testsList: testsMock });
          commit('stopLoadResource', null, { root: true });
        }, 2000)
      } catch (error) {
        // console.log(error);
        commit('errorOccured', { error }, { root: true });
      }

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
    async fetchResult({commit, state}){
      commit('startLoadResource', null, { root: true });
      try {
        setTimeout(() => {
          commit('successToFetchTestResult', { list: resultTest });
          commit('stopLoadResource', null, { root: true });
          commit('setTestStatus', { status: true });
          commit('setEndTime', { time: new Date().getTime()})
          commit('setStringTime', { time: formatTime(state.endTime - state.startTime)})

          const parsed = JSON.stringify(state.list)
          const t = JSON.stringify(state.stringTime)
          localStorage.setItem('testTime',t)
          localStorage.setItem('testResult', parsed)
        }, 2000)
      } catch (error) {
        // console.log(error);
        commit('errorOccured', { error }, { root: true });
      }
    }
  }
};
export default testsStore;