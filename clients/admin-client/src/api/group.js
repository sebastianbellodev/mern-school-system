import axios from './config/axiosAdmin.js';

const ROUTE = '/group';

export const getRequest = () => axios.get(`${ROUTE}`);
