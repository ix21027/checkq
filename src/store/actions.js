import axios from 'axios'

export default {
  // root actions
  async fetchUsers({ commit }) {
    const response = await axios.get('https://reqres.in/api/users');
    const data = response.data.data;
    commit('updateUsers', { userList: data });
  }
};
