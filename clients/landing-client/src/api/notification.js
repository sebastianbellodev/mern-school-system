import axios from './config/axiosNoti.js';

const ROUTE = '/notification';

export const getRequest = () => axios.get(`${ROUTE}`);

export const getByIdRequest = (id) => {
  return axios.get(`${ROUTE}/id/${id}`);
};
