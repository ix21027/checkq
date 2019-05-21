const counterStore = {
  state: {
    c: 0
  },
  mutations: {
    increment(state, payload) {
      state.c += payload.amount;
    },
    decrement(state, payload) {
      state.c -= payload.amount;
    },
  },
  actions: {
    incrementAsync({ commit }, payload) {
      setTimeout(() => {
        commit('increment', payload)
      }, 1000)
    }
  },
  getters: {
    toStr(state) {
      return `[${state.c}]`;
    }
  }
};

export default counterStore;
