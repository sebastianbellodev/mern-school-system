import Type from '../models/type-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    type: {
      name: document.name,
      deleted: document.deleted,
    },
  };
};
