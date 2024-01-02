import body from '../tools/body.js';
import code from '../tools/code.js';
import PropadeuticArea from '../models/propadeutic-area-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      propadeuticAreas: document.map((propadeuticArea) => ({
        id: propadeuticArea._id,
        name: propadeuticArea.name,
        deleted: propadeuticArea.deleted,
        group: propadeuticArea.group,
      })),
    };
  } else {
    return {
      message,
      propadeuticArea: {
        id: document._id,
        name: document.name,
        deleted: document.deleted,
        group: document.group,
      },
    };
  }
};

export const get = async (request, response) => {};

export const getByGroup = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByName = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
