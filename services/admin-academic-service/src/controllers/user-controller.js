import bcrypt from 'bcrypt';
import body from '../tools/body.js';
import code from '../tools/code.js';
import User from '../models/user-model.js';
import { signToken } from '../security/jwt.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      users: document.map((user) => ({
        id: user._id,
        username: user.username,
        deleted: user.deleted,
        role: user.role,
      })),
    };
  } else {
    return {
      message,
      user: {
        id: document._id,
        username: document.username,
        deleted: document.deleted,
        role: document.role,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await User.find({ deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getById = async (request, response) => {
  let id = request.body.id;
  try {
    let document = await User.findOne({ _id: id, deleted: false });
    if (document) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByRole = async (request, response) => {
  let role = request.body.role;
  try {
    let document = await User.find({ role: role, deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByUsername = async (request, response) => {
  let username = request.body.username;
  try {
    let document = await User.findOne({ username: username });
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
  let { username, password } = request.body;
  try {
    let document = await User.findOne({ username: username });
    if (document) {
      let isUser = await bcrypt.compare(password, document.password);
      if (isUser) {
        let token = await signToken(document._id);
        response.cookie('token', token);
        response.send(json(body.LOGIN, document));
      } else {
        response.status(code.UNAUTHORIZED).send({ error: body.LOGIN_FAILED });
      }
    } else {
      response.status(code.UNAUTHORIZED).send({ error: body.LOGIN_FAILED });
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
  let id = request.body.id;
  try {
    let user = await User.findOne({ _id: id, deleted: false });
    if (user) {
      user.deleted = true;
      const document = await user.save();
      response.status(code.OK).send(json(body.DELETE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const signUp = async (request, response) => {
  let { username, password, role } = request.body;
  try {
    let user = await User.findOne({ username: username });
    if (!user) {
      let salt = await bcrypt.genSalt(10);
      bcrypt.hash(password, salt, async (error, hash) => {
        user = new User({ username: username, password: hash, role: role });
        const document = await user.save();
        const token = await signToken(document._id);
        response.cookie('token', token);
        response.status(code.CREATED).send(json(body.POST, document));
      });
    } else {
      response.status(code.BAD_REQUEST).send({ error: body.ENRROLLED });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  let { id, username, password } = request.body;
  try {
    let user = await User.findOne({ username: username });
    if (!user) {
      user = await User.findOne({ _id: id, deleted: false });
      user.username = username;
      let salt = await bcrypt.genSalt(10);
      bcrypt.hash(password, salt, async (error, hash) => {
        user.password = hash;
        let document = await user.save();
        response.status(code.OK).send(json(body.PUT, document));
      });
    } else {
      response.status(code.BAD_REQUEST).send({ error: body.ENRROLLED });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
