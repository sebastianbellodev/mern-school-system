import axios from './config/axiosNoti.js';

const ROUTE = '/notification';

export const getRequest = () => axios.get(`${ROUTE}`);

export const logRequest = (notification) =>
  axios.post(`${ROUTE}`, notification);

export const removeRequest = (id) => axios.delete(`${ROUTE}`, { data: { id } });
