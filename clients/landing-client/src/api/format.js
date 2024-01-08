import axios from './config/axiosNoti.js';

const ROUTE = '/format';

export const getRequest = () => axios.get(`${ROUTE}`);

export const getByIdRequest = (id) => {
  return axios.get(`${ROUTE}/id/${id}`);
};
