import axios from 'axios';

export default {
  login: function(user) {
    return axios.post('/api/users/login', user);
  },

  signup: function(user) {
    return axios.post('/api/users', user);
  }
}