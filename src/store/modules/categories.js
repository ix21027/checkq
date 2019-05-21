import fecthStatus from '@/constants/fetchStatus'
import catogoriesMock from '@/mocks/categories'

const categoriesStore = {
  state: {
    list: [],
    fetchStatus: fecthStatus.success,
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
      await setTimeout(() => commit('successToFetchCategories', {
        categoriesList: catogoriesMock,
      }), 1000);
    }
  }
};

export default categoriesStore;
