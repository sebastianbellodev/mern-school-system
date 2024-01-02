import body from '../tools/body.js';
import code from '../tools/code.js';
import Partial from '../models/partial-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      partials: document.map((partial) => ({
        id: partial._id,
        number: partial.number,
        startDate: partial.startDate,
        endDate: partial.endDate,
        deleted: partial.deleted,
        semester: partial.semester,
      })),
    };
  } else {
    return {
      message,
      partial: {
        id: document._id,
        number: document.number,
        startDate: document.startDate,
        endDate: document.endDate,
        deleted: document.deleted,
        semester: document.semester,
      },
    };
  }
};

export const get = async (request, response) => {};

export const getByDate = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByNumber = async (request, response) => {};

export const getBySemester = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
