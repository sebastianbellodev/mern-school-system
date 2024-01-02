import body from '../tools/body.js';
import code from '../tools/code.js';
import Student from '../models/student-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      students: document.map((student) => ({
        id: student._id,
        niev: student.niev,
        name: student.name,
        paternalSurname: student.paternalSurname,
        maternalSurname: student.maternalSurname,
        address: student.address,
        curp: student.curp,
        emailAddress: student.emailAddress,
        phone: student.phone,
        deleted: student.phone,
        user: student.user,
        tutor: student.tutor,
        groups: student.groups,
      })),
    };
  } else {
    return {
      message,
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
  }
};

export const get = async (request, response) => {};

export const getByGroup = async (request, response) => {};

export const getById = async (request, response) => {};

export const getByNiev = async (request, response) => {};

export const getByTutor = async (request, response) => {};

export const getByUser = async (request, response) => {};

export const log = async (request, response) => {};

export const remove = async (request, response) => {};

export const update = async (request, response) => {};
