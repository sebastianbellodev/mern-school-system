import PropadeuticArea from '../models/propadeutic-area-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    propadeuticArea: {
      id: document._id,
      name: document.name,
      deleted: document.deleted,
      group: document.group,
    },
  };
};

export const get = async (request, response) => {};

export const getByGroup = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByName = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
