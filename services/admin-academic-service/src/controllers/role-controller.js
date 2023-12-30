import Role from '../models/role-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    role: {
      id: document._id,
      name: document.name,
      deleted: document.deleted,
    },
  };
};
