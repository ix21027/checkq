import fecthStatus from '@/constants/fetchStatus'
import testsMock from '@/mocks/questions'
import Vue from 'vue'
// import axios from 'axios';

const testsStore = {
  state: {
    list: [],
    currentNumber: 0,
    fetchStatus: fecthStatus.failed,
    countPassed: 0,
    startTime: null,
    endTime: null
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
    setStartTime(state,payload){
      state.startTime = payload.time
    },
    setEndTime(state,payload){
      state.endTime = payload.time
    }
  },
  actions: {
    async fetchTests({ commit }) {
      commit('startToFetchTests');
      commit('changeCurrentNumber',{ currentNumber: 0})
      commit('setCountPassed',{ count: 0})
      commit('setStartTime',{ time: null})
      commit('setEndTime',{ time: null})

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
  }
};
export default testsStore;