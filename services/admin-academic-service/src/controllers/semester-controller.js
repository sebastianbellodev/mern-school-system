import Semester from '../models/semester-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    semester: {
      id: document._id,
      startDate: document.startDate,
      endDate: document.endDate,
      deleted: document.deleted,
    },
  };
};

export const get = async (request, response) => {};

export const getByDate = async (request, response) => {};

export const getById = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
