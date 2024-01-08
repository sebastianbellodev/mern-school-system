import basicAuth from 'basic-auth';
import body from '../tools/body.js';
import code from '../tools/code.js';
import dotenv from 'dotenv';

dotenv.config();

const KEY = {
  USERNAME: process.env.AUTH_USERNAME,
  PASSWORD: process.env.AUTH_PASSWORD,
};

export const isValidAuth = (request, response, callback) => {
  const auth = basicAuth(request);
  if (auth) {
    if (auth.name === KEY.USERNAME && auth.pass === KEY.PASSWORD) {
      return callback();
    }
    return response
      .status(code.UNAUTHORIZED)
      .send({ error: body.INVALID_AUTHORIZATION });
  }
  return response
    .status(code.UNAUTHORIZED)
    .send({ error: body.MISSING_AUTHORIZATION });
};
