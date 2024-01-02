import body from '../tools/body.js';
import code from '../tools/code.js';
import Semester from '../models/semester-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      semesters: document.map((semester) => ({
        id: semester._id,
        name: semester.name,
        deleted: semester.deleted,
      })),
    };
  } else {
    return {
      message,
      semester: {
        id: document._id,
        startDate: document.startDate,
        endDate: document.endDate,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {};

export const getByDate = async (request, response) => {};

export const getById = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
