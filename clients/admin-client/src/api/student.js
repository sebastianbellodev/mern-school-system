import axios from './config/axiosAdmin.js';

const ROUTE = '/student';

export const getRequest = () => axios.get(`${ROUTE}`);

export const getByIdRequest = (id) => axios.get(`${ROUTE}/${id}`);

export const logRequest = (student) => axios.post(`${ROUTE}`, student);

export const updateRequest = (student) => axios.put(`${ROUTE}`, student);

export const removeRequest = (id) => axios.delete(`${ROUTE}/${id}`);
