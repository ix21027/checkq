export default {
  updateUsers(state, payload) {
    state.users = payload.userList;
  },
  startLoadResource(state) {
    state.loading = true;
  },
  stopLoadResource(state) {
    state.loading = false;
  },
  errorOccured(state, payload) {
    state.errors = [...state.errors, payload.error];
  }
}
