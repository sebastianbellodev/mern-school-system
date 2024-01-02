import body from '../tools/body.js';
import code from '../tools/code.js';
import Notification from '../models/notification-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      notifications: document.map((notification) => ({
        id: notification._id,
        title: notification.number,
        file: notification.file,
        deleted: notification.deleted,
      })),
    };
  } else {
    return {
      message,
      notification: {
        id: document._id,
        title: document.title,
        description: document.description,
        date: document.date,
        image: document.image,
        isSpinner: document.isSpinner,
        type: document.type,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {};

export const getByDate = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByTitle = async (request, response) => {};

export const getByType = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
