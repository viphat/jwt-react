import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/';

const login = (username, password) => {
  return axios
    .post(API_URL + 'sign_in', { user: {
      username,
      password,
    }}, { headers: { 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content }})
    .then((response) => {
      if (response.data.jwt) {
        localStorage.setItem('jwt', response.data.jwt);
      }

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    });
};

const logout = () => {
  return axios
    .delete(API_URL + 'sign_out', { headers: { ...authHeader(), 'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content }, data: { } })
    .then((response) => {
      localStorage.removeItem('user');
      localStorage.removeItem('jwt');
    });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  login,
  logout,
  getCurrentUser,
};
