import Tutor from '../models/tutor-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    tutor: {
      id: document._id,
      name: document.name,
      paternalSurname: document.paternalSurname,
      maternalSurname: document.maternalSurname,
      address: document.address,
      emailAddress: document.emailAddress,
      phone: document.phone,
      deleted: document.deleted,
    },
  };
};

export const get = async (request, response) => {};

export const getByEmailAddress = async (request, response) => {};

export const getById = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
