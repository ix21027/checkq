import fecthStatus from '@/constants/fetchStatus'
// import catogoriesMock from '@/mocks/categories'
import axios from 'axios';

const categoriesStore = {
  state: {
    list: [],
    selectedCategories: [],
    fetchStatus: fecthStatus.failed,
  },
  mutations: {
    successToFetchCategories(state, payload) {
      state.list = payload.categoriesList;
      state.fetchStatus = fecthStatus.success;
    },
    startToFetchCategories(state) {
      state.fetchStatus = fecthStatus.start;
    },
    failToFetchCategories(state) {
      state.fetchStatus = fecthStatus.failed;
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      // TODO add api request
      // get /api/subjects
      const headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }
      const data = await axios.get('https://checkq-api.herokuapp.com/api/subjects', {
        headers
      });
      // console.log(data.data);
      commit('startToFetchCategories');
      await setTimeout(() => commit('successToFetchCategories', {
        categoriesList: data.data,
      }), 1000);
    }
  }
};

export default categoriesStore;