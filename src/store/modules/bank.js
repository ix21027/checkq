import { http, status } from '@/fetchapi';
import { renderFormula } from '@/utils';

const userStore = {
  state: {
    tests: [],
    subjects: [],
  },

  mutations: {
    setBank(state, payload) {
      state.tests = payload.tests;
      state.subjects = payload.subjects;
    }
  },

  actions: {
    async fetchBank({ commit }) {
      const ctx = { title: 'bank' };
      let fetchStatus = status.start;
      try {
        commit('startLoading', ctx, { root: true });

        let { data: bankData } = await http.get('bank');
        const { data: subjectData } = await http.get('subjects');

        bankData = bankData.map(test => ({
            ...test,
            question_name: renderFormula(test.question_name),
            answer_name: renderFormula(test.answer_name),
          }));
        /** bankData: Array of
         * {
         *  question_id: Number,
         *  question_name: String,
         *  answer_name: String,
         *  subject_id: Number,
         * }
        */

        /** subjectData: Array of
         * {
         *  id: Number,
         *  name: String,
         *  question_count: Number,
         * }
        */

        commit('setBank', { tests: bankData, subjects: subjectData })
        fetchStatus = status.success;
      } catch (err) {
        commit('errorOccured', { error: err }, { root: true });
        fetchStatus = status.error;
      } finally {
        commit('stopLoading', ctx, { root: true });
      }
      return { status: fetchStatus };
    },
    async registration({ commit }, payload) {
      // payload {email: String, password: String, password_confiramtion: String, username: String}
      const ctx = { title: 'registration' };
      try {
        commit('startLoading', ctx, { root: true });

        const jsonData = JSON.stringify({ user: payload });
        const response = await http.post('profile', jsonData);

        commit('successRegistration', { data: response });
      } catch (err) {
        commit('errorOccured', { error: err }, { root: true });
      } finally {
        commit('stopLoading', ctx, { root: true });
      }
    },
    userSignOut({ commit }) {
      commit('successSignOut');
    }
  }
};

export default userStore;