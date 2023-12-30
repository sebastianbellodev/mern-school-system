import Tutor from '../models/tutor-model.js';
import body from '../tools/body.js';
import code from '../tools/code.js';

const json = (operation, document) => {
  return {
    operation,
    tutor: {
      name: document.name,
      paternalSurname: document.paternalSurname,
      maternalSurname: document.maternalSurname,
      address: document.address,
      emailAddress: document.emailAddress,
      phone: document.phone,
      deleted: document.deleted,
    },
  };
};
