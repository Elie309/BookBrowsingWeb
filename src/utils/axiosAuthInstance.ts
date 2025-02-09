import axios from 'axios';
import  store from './store';

const axiosAuthInstance = axios.create();

axiosAuthInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosAuthInstance;
