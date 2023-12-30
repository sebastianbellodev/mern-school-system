import Subject from '../models/subject-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    subject: {
      id: document._id,
      name: document.name,
      isJobTraining: document.isJobTraining,
      deleted: document.deleted,
      groups: document.groups,
    },
  };
};

export const get = async (request, response) => {};

export const getByGroup = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByJobTraining = async (request, response) => {};

export const getByName = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
