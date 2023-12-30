import Grade from '../models/grade-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    grade: {
      id: document._id,
      number: document.number,
      deleted: document.deleted,
      partial: document.partial,
      student: document.student,
      subject: document.subject,
    },
  };
};

export const get = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByNumber = async (request, response) => {};

export const getByPartial = async (request, response) => {};

export const getByStudent = async (request, response) => {};

export const getBySubject = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
