import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import grade from './routes/grade-routes.js';
import group from './routes/group-routes.js';
import partial from './routes/partial-routes.js';
import propadeuticArea from './routes/propadeutic-area-routes.js';
import role from './routes/role-routes.js';
import semester from './routes/semester-routes.js';
import student from './routes/student-routes.js';
import subject from './routes/subject-routes.js';
import teacher from './routes/teacher-routes.js';
import tutor from './routes/tutor-routes.js';
import user from './routes/user-routes.js';
import code from './tools/code.js';

const app = express();
const api = '/api';

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(api, grade);
app.use(api, group);
app.use(api, partial);
app.use(api, propadeuticArea);
app.use(api, role);
app.use(api, semester);
app.use(api, student);
app.use(api, subject);
app.use(api, teacher);
app.use(api, tutor);
app.use(api, user);

app.use((request, response, next) => {
  response.sendStatus(code.OK);
});

export default app;
