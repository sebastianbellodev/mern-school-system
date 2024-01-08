import axios from './config/axiosAdmin.js';

const ROUTE = '/grade';

export const getGradeStudentRequest = (student) =>
  axios.get(`${ROUTE}/student/:student`, student);
