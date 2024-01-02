import body from '../tools/body.js';
import code from '../tools/code.js';
import Type from '../models/type-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      types: document.map((type) => ({
        id: type._id,
        title: type.number,
        file: type.file,
        deleted: type.deleted,
      })),
    };
  } else {
    return {
      message,
      type: {
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
