import axios from './config/axiosAdmin.js';

const ROUTE = '/user';

export const loginRequest = (user) => axios.post(`${ROUTE}/login`, user);

export const tokenRequest = () => axios.get(`${ROUTE}/token`);
