import body from '../tools/body.js';
import code from '../tools/code.js';
import Format from '../models/format-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      formats: document.map((format) => ({
        id: format._id,
        title: format.number,
        file: format.file,
        deleted: format.deleted,
      })),
    };
  } else {
    return {
      message,
      format: {
        id: document._id,
        title: document.number,
        file: document.file,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByTitle = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
