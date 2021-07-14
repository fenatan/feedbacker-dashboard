import axios from 'axios';
import router from '../router';
import Store from '../store';
import AuthService from './auth';
import UsersService from './users';

const API_ENVS = {
  local: 'http://localhost:3000',
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
});

httpClient.interceptors.request.use((config) => {
  Store.Global.setGlobalLoading(true);

  const token = window.localStorage.getItem('token');
  const newConfigs = { ...config };

  if (token) {
    newConfigs.headers.common.Authorization = `Bearer ${token}`;
  }

  return newConfigs;
});

httpClient.interceptors.response.use((response) => {
  Store.Global.setGlobalLoading(false);
  return response;
}, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500;

  if (canThrowAnError) {
    Store.Global.setGlobalLoading(false);
    throw new Error(error.message);
  }

  if (error.response.status === 401) {
    router.push({ name: 'home' });
  }

  Store.Global.setGlobalLoading(false);
  return error;
});

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
};
