import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import format from './routes/format-routes.js';
import notification from './routes/notification-routes.js';
import type from './routes/type-routes.js';
import code from './tools/code.js';

const app = express();
const api = '/api';

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
