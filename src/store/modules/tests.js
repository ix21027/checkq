import fecthStatus from '@/constants/fetchStatus'
import testsMock from '@/mocks/questions'
// import axios from 'axios';

const testsStore = {
  state: {
    list: [],
    currentId: 0,
    fetchStatus: fecthStatus.failed,
  },
  mutations: {
    successToFetchTests(state, payload) {
      state.list = payload.testsList;
      state.currentId = payload.testsList[0].id
      state.fetchStatus = fecthStatus.success;
    },
    startToFetchTests(state) {
      state.fetchStatus = fecthStatus.start;
    },
    failToFetchTests(state) {
      state.fetchStatus = fecthStatus.failed;
    },
    changeCurrentId(state,payload){
      state.currentId = payload.currentId
    }
  },
  actions: {
    async fetchTests({ commit }) {
      commit('startToFetchTests');

			await setTimeout(()=>{
				commit('successToFetchTests',{testsList:testsMock})
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
    }
  }
};

export default testsStore;