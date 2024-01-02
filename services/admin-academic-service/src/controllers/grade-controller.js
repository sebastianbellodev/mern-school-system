import body from '../tools/body.js';
import code from '../tools/code.js';
import Grade from '../models/grade-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      grades: document.map((grade) => ({
        id: grade._id,
        number: grade.number,
        deleted: grade.deleted,
        partial: grade.partial,
        student: grade.student,
        subject: grade.subject,
      })),
    };
  } else {
    return {
      message,
      grade: {
        id: document._id,
        number: document.number,
        deleted: document.deleted,
        partial: document.partial,
        student: document.student,
        subject: document.subject,
      },
    };
  }
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
