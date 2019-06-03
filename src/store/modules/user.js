import { http, status } from '@/fetchapi';

const userStore = {
  state: {
    userEmail: '',
    userName: '',
    accessToken: '',
    isAuth: false,
    isRegister: false,
    requestStatus: status.initial,
  },

  mutations: {
    successAuthorization(state, payload) {
      state.accessToken = payload.accessToken;
      state.isAuth = true;
    },

    successRegistration(state) {
      state.isRegister = true;
    },

    successSignOut(state) {
      state.userEmail = '';
      state.username = '';
      state.accessToken = '';
      state.isAuth = false;
    }
  },

  actions: {
    async authorization({ commit }, payload) {
      // payload {email: String, password: String}
      const ctx = { title: 'user' };
      try {
        commit('startLoading', ctx, { root: true });

        const jsonData = JSON.stringify({session: payload});
        const response = await http.post('session', jsonData);

        commit('successAuthorization', { accessToken: response.data.user_auth_token })
        // TODO: save to local storage
      } catch (err) {
        commit('errorOccured', { error: err }, { root: true });
      } finally {
        commit('stopLoading', ctx, { root: true });
      }
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