import axios from './config/axiosNoti.js';

const ROUTE = '/subject';

export const getRequest = () => axios.get(`${ROUTE}`);

export const getByIdRequest = (id) => {
  return axios.get(`${ROUTE}/id/:id/${id}`);
};

export const logRequest = (subject) => axios.post(`${ROUTE}`, subject);

export const updateRequest = (subject) => axios.put(`${ROUTE}`, subject);

export const removeRequest = (id) => axios.delete(`${ROUTE}/:id/${id}`);
