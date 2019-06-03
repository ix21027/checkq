import fecthStatus from '@/constants/fetchStatus'
import { http } from '@/fetchapi';

const categoriesStore = {
  state: {
    list: [],
    selectedCategories: [],
    fetchStatus: fecthStatus.failed,
  },

  mutations: {
    successToFetchCategories(state, payload) {
      state.list = payload.categories;
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
      const ctx = { title: 'categories' };

      commit('startLoading', ctx, { root: true });
      commit('startToFetchCategories');
      try {
        const response = await http.get('subjects');

        commit('successToFetchCategories', { categories: response.data});
      } catch (error) {
        commit('failToFetchCategories', { error });
      } finally {
        commit('stopLoading', ctx, { root: true });
      }
    }
  }
};

export default categoriesStore;