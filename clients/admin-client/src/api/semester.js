import axios from './config/axiosAdmin.js';

const ROUTE = '/semester';

export const getRequest = () => axios.get(`${ROUTE}`);

export const getByIdRequest = (id) => axios.get(`${ROUTE}/id/:id/${id}`);

export const logRequest = (semester) => axios.post(`${ROUTE}`, semester);

export const updateRequest = (semester) => axios.put(`${ROUTE}`, semester);

export const removeRequest = (id) => axios.delete(`${ROUTE}/:id/${id}`);
