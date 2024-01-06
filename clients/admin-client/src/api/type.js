import axios from './config/axiosNoti.js';

const ROUTE = '/type';

export const getRequest = () => axios.get(`${ROUTE}`);
