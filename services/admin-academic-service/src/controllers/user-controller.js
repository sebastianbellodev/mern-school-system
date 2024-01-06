import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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
        role: user.role,
        deleted: user.deleted,
      })),
    };
  } else {
    return {
      message,
      user: {
        id: document._id,
        username: document.username,
        role: document.role,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await User.find({ deleted: false }).populate('role');
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
    let document = await User.findOne({ _id: id, deleted: false }).populate(
      'role'
    );
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
    let document = await User.find({ role: role, deleted: false }).populate(
      'role'
    );
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
    let document = await User.findOne({
      username: username,
      deleted: false,
    }).populate('role');
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
    let document = await User.findOne({
      username: username,
      deleted: false,
    }).populate('role');
    if (document) {
      let isUser = await bcrypt.compare(password, document.password);
      if (isUser) {
        let id = document._id;
        let token = await signToken(id);
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
    let document = await User.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    ).populate('role');
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
  let { username, password, role } = request.body;
  try {
    let user = await User.findOne({ username: username, deleted: false });
    if (!user) {
      let salt = await bcrypt.genSalt(10);
      bcrypt.hash(password, salt, async (error, hash) => {
        user = new User({ username: username, password: hash, role: role });
        let document = await user.save();
        let id = document._id;
        let token = await signToken(id);
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
  let id = request.body.id;
  try {
    let document = await User.findByIdAndUpdate(id, request.body, {
      new: true,
    }).populate('role');
    if (document) {
      response.status(code.OK).send(json(body.PUT, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
