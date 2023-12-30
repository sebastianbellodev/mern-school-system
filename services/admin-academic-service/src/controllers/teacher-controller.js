import Teacher from '../models/teacher-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    teacher: {
      name: document.name,
      paternalSurname: document.paternalSurname,
      maternalSurname: document.maternalSurname,
      emailAddress: document.emailAddress,
      deleted: document.deleted,
      user: document.user,
      groups: document.groups,
      subjects: document.subjects,
    },
  };
};
