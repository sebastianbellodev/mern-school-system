import body from '../tools/body.js';
import code from '../tools/code.js';
import Subject from '../models/subject-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      subjects: document.map((subject) => ({
        id: subject._id,
        name: subject.name,
        isJobTraining: subject.isJobTraining,
        deleted: subject.deleted,
        groups: subject.groups,
      })),
    };
  } else {
    return {
      message,
      subject: {
        id: document._id,
        name: document.name,
        isJobTraining: document.isJobTraining,
        deleted: document.deleted,
        groups: document.groups,
      },
    };
  }
};

export const get = async (request, response) => {};

export const getByGroup = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByJobTraining = async (request, response) => {};

export const getByName = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
