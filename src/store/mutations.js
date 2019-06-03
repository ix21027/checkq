export default {
  startLoading(state, payload) {
    // payload { title: string }
    state.loader.push(payload);
  },

  stopLoading(state, payload) {
    // payload { title: string }
    state.loader = state.loader.filter(loads => loads.title !== payload.title);
  },

  updateUsers(state, payload) {
    state.users = payload.userList;
  },

  startLoadResource(state) {
    state.loading = true;
    state.loadingCount += 1;
  },
  stopLoadResource(state) {
    state.loadingCount -= state.loadingCount <= 0 ? 0 : 1;
    if (state.loadingCount === 0) {
      state.loading = false;
    }
  },
  errorOccured(state, payload) {
    state.errors = [...state.errors, payload.error];
  }
}
