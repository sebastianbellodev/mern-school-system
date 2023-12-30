import Notification from '../models/notification-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    notification: {
      title: document.title,
      description: document.description,
      date: document.date,
      image: document.image,
      isSpinner: document.isSpinner,
      type: document.type,
      deleted: document.deleted,
    },
  };
};
