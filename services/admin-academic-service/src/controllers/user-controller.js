import bcrypt from 'bcrypt';
import body from '../tools/body.js';
import code from '../tools/code.js';
import User from '../models/user-model.js';
import { signToken } from '../security/jwt.js';

const user_json = (operation, document) => {
  return {
    operation,
    user: {
      id: document._id,
      username: document.username,
    },
  };
};

export const signup = async (request, response) => {
  const { username, password } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(password, salt, async (error, hash) => {
      const user = new User({ username, password: hash });
      const document = await user.save();
      const token = await signToken(document._id);
      response.cookie('token', token);
      response.status(code.CREATED).send(user_json(body.SIGN_UP, document));
    });
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const login = async (request, response) => {
  const { username, password } = request.body;
  try {
    const document = await User.findOne({ username });
    if (!document)
      return response
        .status(code.UNAUTHORIZED)
        .send({ error: body.LOGIN_FAILED });
    const isUser = await bcrypt.compare(password, document.password);
    if (!isUser) {
      response.status(code.UNAUTHORIZED).send({ error: body.LOGIN_FAILED });
    } else {
      const token = await signToken(document._id);
      response.cookie('token', token);
      response.send(user_json(body.LOGIN, document));
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const logout = (request, response) => {
  response.cookie('token', '', { expires: new Date(0) });
  return response.send({ operation: body.LOG_OUT });
};

export const user = async (request, response) => {
  const { username } = request.params;
  try {
    const document = await User.findOne({ username });
    if (!document) {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    } else {
      response.send(user_json(body.RETRIEVE, document));
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
