export default {
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
    console.log(payload);
    state.errors = [...state.errors, payload.error];
  }
}
