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
      state.fetchStatus = fecthStatus.fail;
    }
  },
  actions: {
    async fetchCategories({ commit }) {
      commit('startToFetchCategories');

      const headers = {
        'Content-type': 'application/json',
        'Accept': 'application/json'
      }

      try {
        const data = await axios.get('https://checkq-api.herokuapp.com/api/subjects', {
          headers
        });
        commit('successToFetchCategories', { categoriesList: data.data});
      } catch (error) {
        commit('failToFetchCategories', { error })
      }
    }
  }
};

export default categoriesStore;