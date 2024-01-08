import express from 'express';
import code from './tools/code.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import format from './routes/format-routes.js';
import morgan from 'morgan';
import notification from './routes/notification-routes.js';
import type from './routes/type-routes.js';

dotenv.config();

const app = express();
const api = '/api';

const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(
  cors({
    origin: 'http://localhost:5173',
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
