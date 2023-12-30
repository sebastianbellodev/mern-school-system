import Student from '../models/student-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    student: {
      id: document._id,
      niev: document.niev,
      name: document.name,
      paternalSurname: document.paternalSurname,
      maternalSurname: document.maternalSurname,
      address: document.address,
      curp: document.curp,
      emailAddress: document.emailAddress,
      phone: document.phone,
      deleted: document.phone,
      user: document.user,
      tutor: document.tutor,
      groups: document.groups,
    },
  };
};
