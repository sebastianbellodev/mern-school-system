import Grade from '../models/grade-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    grade: {
      id: document._id,
      number: document.number,
      deleted: document.deleted,
      partial: document.partial,
      student: document.student,
      subject: document.subject,
    },
  };
};
