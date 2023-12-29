import basicAuth from 'basic-auth';
import body from '../tools/body.js';
import code from '../tools/code.js';

export const isValidAuth = (request, response, callback) => {
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

const key = {
  USERNAME: process.env.AUTH_USERNAME,
  PASSWORD: process.env.AUTH_PASSWORD,
};
