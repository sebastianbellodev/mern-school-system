import Subject from '../models/subject-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    subject: {
      name: document.name,
      isJobTraining: document.isJobTraining,
      deleted: document.deleted,
      groups: document.groups,
    },
  };
};
