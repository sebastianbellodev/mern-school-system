import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import code from './tools/code.js';
import userRoutes from './routes/user.routes.js';

const app = express();

const API = '/api';

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(API, userRoutes);

app.use((request, response, next) => {
  response.sendStatus(code.OK);
});

export default app;
