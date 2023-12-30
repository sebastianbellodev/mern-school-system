import Partial from '../models/partial-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    partial: {
      id: document._id,
      number: document.number,
      startDate: document.startDate,
      endDate: document.endDate,
      deleted: document.deleted,
      semester: document.semester,
    },
  };
};
