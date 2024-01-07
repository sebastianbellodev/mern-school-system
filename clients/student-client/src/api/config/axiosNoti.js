import axios from 'axios';

const API = import.meta.env.VITE_NOTI_API;
const AUTH_USERNAME = import.meta.env.VITE_AUTH_USERNAME;
const AUTH_PASSWORD = import.meta.env.VITE_AUTH_PASSWORD;

const axiosInstance = axios.create({
  baseURL: API,
  auth: { username: AUTH_USERNAME, password: AUTH_PASSWORD },
});

export default axiosInstance;
