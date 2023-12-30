import Teacher from '../models/teacher-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    teacher: {
      id: document._id,
      name: document.name,
      paternalSurname: document.paternalSurname,
      maternalSurname: document.maternalSurname,
      emailAddress: document.emailAddress,
      deleted: document.deleted,
      user: document.user,
      groups: document.groups,
      subjects: document.subjects,
    },
  };
};

export const get = async (request, response) => {};

export const getByEmailAddress = async (request, response) => {};

export const getByGroup = async (request, response) => {};

export const getById = async (request, response) => {};

export const getBySubject = async (request, response) => {};

export const getByUser = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
