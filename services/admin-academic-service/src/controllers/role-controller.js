import body from '../tools/body.js';
import code from '../tools/code.js';
import Role from '../models/role-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      roles: document.map((role) => ({
        id: role._id,
        name: role.name,
        deleted: role.deleted,
      })),
    };
  } else {
    return {
      message,
      role: {
        id: document._id,
        name: document.name,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByName = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
