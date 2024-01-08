import axios from './config/axiosAdmin.js';

const ROUTE = '/subject';

export const getGroupSubjectsRequest = (group) =>
  axios.get(`${ROUTE}/group/:group`, group);
