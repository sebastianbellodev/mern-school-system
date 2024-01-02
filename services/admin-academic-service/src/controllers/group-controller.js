import body from '../tools/body.js';
import code from '../tools/code.js';
import Group from '../models/group-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      groups: document.map((group) => ({
        id: group._id,
        number: group.number,
        deleted: group.deleted,
      })),
    };
  } else {
    return {
      message,
      group: {
        id: document._id,
        number: document.number,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByNumber = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
