import axios from './config/axiosAdmin.js';

const ROUTE = '/courses';

export const getGroupSubjectsRequest = (group) =>
  axios.get(`${ROUTE}/group`, group);
