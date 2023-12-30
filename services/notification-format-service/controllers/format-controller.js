import Format from '../models/format-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    format: {
      id: document._id,
      title: document.number,
      file: document.file,
      deleted: document.deleted,
    },
  };
};

export const get = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByTitle = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
