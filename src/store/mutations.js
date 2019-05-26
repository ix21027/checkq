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
    // console.log('error', payload.error);
    
    state.errors = [...state.errors, payload.error];
  }
}
