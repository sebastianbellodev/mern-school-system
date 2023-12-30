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
