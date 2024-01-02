import basicAuth from 'basic-auth';
import dotenv from 'dotenv';
import body from '../tools/body.js';
import code from '../tools/code.js';

dotenv.config();

const key = {
  USERNAME: process.env.AUTH_USERNAME,
  PASSWORD: process.env.AUTH_PASSWORD,
};

const isValidAuth = (request, response, callback) => {
  const auth = basicAuth(request);
  if (auth) {
    if (auth.name === key.USERNAME && auth.pass === key.PASSWORD) {
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

export default isValidAuth;
