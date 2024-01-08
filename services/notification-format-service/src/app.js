import express from 'express';
import code from './tools/code.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import format from './routes/format-routes.js';
import morgan from 'morgan';
import notification from './routes/notification-routes.js';
import type from './routes/type-routes.js';

const app = express();
const api = '/api';

const ADMIN_CORS_ORIGIN = process.env.ADMIN_CORS_ORIGIN;

app.use(
  cors({
    origin: [ADMIN_CORS_ORIGIN],
  })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(api, format);
app.use(api, notification);
app.use(api, type);

app.use((request, response, next) => {
  response.sendStatus(code.OK);
});

export default app;
