import Semester from '../models/semester-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    semester: {
      id: document._id,
      startDate: document.startDate,
      endDate: document.endDate,
      deleted: document.deleted,
    },
  };
};
