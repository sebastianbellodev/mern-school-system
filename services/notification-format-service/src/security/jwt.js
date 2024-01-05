import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import body from '../tools/body.js';
import code from '../tools/code.js';

dotenv.config();

const KEY = process.env.JWT_KEY;

export const signToken = (id) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ id }, KEY, { expiresIn: '2h' }, (error, token) => {
      !error ? resolve(token) : reject(error);
    });
  });
};

export const isValidToken = (request, response, callback) => {
  const token = request.cookies.token;
  if (token) {
    jwt.verify(token, KEY, (error, id) => {
      if (error) {
        return response
          .status(code.FORBIDDEN)
          .send({ error: body.INVALID_TOKEN });
      }
      request.id = id;
      return callback();
    });
  } else {
    return response.status(code.FORBIDDEN).send({ error: body.MISSING_TOKEN });
  }
};
