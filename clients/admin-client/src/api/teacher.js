import axios from './config/axiosAdmin.js';

const ROUTE = '/teacher';

export const getRequest = () => axios.get(`${ROUTE}`);

export const getByIdRequest = (id) => axios.get(`${ROUTE}s/${id}`);

export const logRequest = (teacher) => axios.post(`${ROUTE}`, teacher);

export const updateRequest = (teacher) => axios.put(`${ROUTE}`, teacher);

export const removeRequest = (id) => axios.delete(`${ROUTE}/${id}`);
