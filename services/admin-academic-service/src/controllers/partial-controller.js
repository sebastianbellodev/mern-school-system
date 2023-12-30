import Partial from '../models/partial-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    partial: {
      id: document._id,
      number: document.number,
      startDate: document.startDate,
      endDate: document.endDate,
      deleted: document.deleted,
      semester: document.semester,
    },
  };
};

export const get = async (request, response) => {};

export const getByDate = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByNumber = async (request, response) => {};

export const getBySemester = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
