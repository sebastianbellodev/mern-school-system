import axios from './config/axiosNoti.js';

const ROUTE = '/notification';

export const getRequest = () => axios.get(`${ROUTE}`);

export const getByIdRequest = (id) => {
  return axios.get(`${ROUTE}/${id}`);
};

export const logRequest = (formData) =>
  axios.post(`${ROUTE}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateRequest = (formData) =>
  axios.put(`${ROUTE}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const removeRequest = (id) => axios.delete(`${ROUTE}/${id}`);
