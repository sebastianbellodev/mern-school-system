import bcrypt from 'bcrypt';
import User from '../models/user-model.js';
import signToken from '../security/jwt.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    user: {
      id: document._id,
      username: document.username,
      deleted: document.deleted,
      role: document.role,
    },
  };
};

export const getByUsername = async (request, response) => {
  const { username } = request.params;
  try {
    const document = await User.findOne({ username: username });
    if (document) {
      response.send(json(body.RETRIEVE, document));
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
    const document = await User.findOne({ username: username });
    if (document) {
      const isUser = await bcrypt.compare(password, document.password);
      if (isUser) {
        const token = await signToken(document._id);
        response.cookie('token', token);
        response.send(json(body.LOGIN, document));
      } else {
        response.status(code.UNAUTHORIZED).send({ error: body.LOGIN_FAILED });
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

export const remove = async (request, response) => {
  const { username } = request.body;
  try {
    document = await User.findOneAndUpdate(
      { username: username },
      { deleted: true },
      { new: true }
    );
    if (document) {
      response.status(code.OK).send(json(body.DELETE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const signUp = async (request, response) => {
  const { username, password } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(password, salt, async (error, hash) => {
      const user = new User({ username: username, password: hash });
      const document = await user.save();
      const token = await signToken(document._id);
      response.cookie('token', token);
      response.status(code.CREATED).send(json(body.SIGN_UP, document));
    });
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  const { username, password } = request.body;
  try {
    const salt = await bcrypt.genSalt(10);
    bcrypt.hash(password, salt, async (error, hash) => {
      document = await User.findOneAndUpdate(
        { username: username },
        { password: hash },
        { new: true }
      );
      if (document) {
        response.status(code.OK).send(json(body.PUT, document));
      } else {
        response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
      }
    });
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
