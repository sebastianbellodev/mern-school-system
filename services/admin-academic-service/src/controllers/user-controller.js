import bcrypt from 'bcrypt';
import body from '../tools/body.js';
import code from '../tools/code.js';
import User from '../models/user-model.js';
import { signToken } from '../security/jwt.js';

const USER_JSON = (operation, document) => {
  return {
    operation,
    user: {
      id: document._id,
      username: document.username,
    },
  };
};

export const getUser = async (request, response) => {
  const { username } = request.params;
  try {
    const document = await User.findOne({ username });
    if (document) {
      response.send(USER_JSON(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const login = async (request, response) => {
  const { username, password } = request.body;
  try {
    const document = await User.findOne({ username });
    if (document) {
      const isUser = await bcrypt.compare(password, document.password);
      if (!isUser) {
        response.status(code.UNAUTHORIZED).send({ error: body.LOGIN_FAILED });
      } else {
        const token = await signToken(document._id);
        response.cookie('token', token);
        response.send(USER_JSON(body.LOGIN, document));
      }
    } else {
      return response
        .status(code.UNAUTHORIZED)
        .send({ error: body.LOGIN_FAILED });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const logOut = (request, response) => {
  response.cookie('token', '', { expires: new Date(0) });
  return response.send({ operation: body.LOG_OUT });
};

export const signUp = async (request, response) => {
  const { username, password } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(password, salt, async (error, hash) => {
      const user = new User({ username, password: hash });
      const document = await user.save();
      const token = await signToken(document._id);
      response.cookie('token', token);
      response.status(code.CREATED).send(USER_JSON(body.SIGN_UP, document));
    });
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  const { username, password } = request.body;
  try {
    const document = await User.findOne({ username });
    if (document) {
      const salt = await bcrypt.genSalt(10);
      bcrypt.hash(password, salt, async (error, hash) => {
        const user = new User({ username, password: hash });
        document = await User.findOneAndUpdate({ username }, user);
        response.status(code.OK).send(USER_JSON(body.PUT, document));
      });
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
