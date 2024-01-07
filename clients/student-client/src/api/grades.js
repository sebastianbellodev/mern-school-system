import axios from './config/axiosAdmin.js';

const ROUTE = '/grade';

export const gradeStudentRequest = (student) =>
  axios.get(`${ROUTE}/student`, student);
