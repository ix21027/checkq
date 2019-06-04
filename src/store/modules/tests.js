import fecthStatus from '@/constants/fetchStatus'
import resultTest from '@/mocks/resultTest'
import { formatTime, shuffle } from '@/utils'
import Vue from 'vue'
import axios from 'axios';

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
      commit('startToFetchTests');
      commit('startLoadResource', null, { root: true });

      try {
        const headers = {
          'Content-type': 'application/json',
          'Accept': 'application/json'
        }

        const requestData = JSON.stringify({test: {
          subject_ids: payload.categories,
          question_count: payload.testCount
        }});

        const response = await axios({
            url: 'https://checkq-api.herokuapp.com/api/test',
            method: 'POST',
            headers,
            data: requestData,
          }
        );

        let testsList = response.data.map(t => ({  ...t, options: shuffle(t.options) }));
        testsList = shuffle(testsList);

        commit('successToFetchTests', { testsList });
        commit('stopLoadResource', null, { root: true });
      } catch (error) {
        commit('errorOccured', { error }, { root: true });
      }
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
        commit('errorOccured', { error }, { root: true });
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