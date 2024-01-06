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
        curp: student.curp,
        address: student.address,
        emailAddress: student.emailAddress,
        phone: student.phone,
        groups: student.groups,
        tutor: student.tutor,
        user: student.user,
        deleted: student.deleted,
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
        curp: document.curp,
        address: document.address,
        emailAddress: document.emailAddress,
        phone: document.phone,
        groups: document.groups,
        tutor: document.tutor,
        user: document.user,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await Student.find({ deleted: false })
      .populate('groups')
      .populate('tutor')
      .populate('user');
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByGroup = async (request, response) => {
  let group = request.body.groups[0];
  try {
    let document = await Student.find({ groups: group, deleted: false })
      .populate('groups')
      .populate('tutor')
      .populate('user');
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getById = async (request, response) => {
  let id = request.body.id;
  try {
    let document = await Student.findOne({ _id: id, deleted: false })
      .populate('groups')
      .populate('tutor')
      .populate('user');
    if (document) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByNiev = async (request, response) => {
  let niev = request.body.niev;
  try {
    let document = await Student.findOne({ niev: niev, deleted: false })
      .populate('groups')
      .populate('tutor')
      .populate('user');
    if (document) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByTutor = async (request, response) => {
  let tutor = request.body.tutor;
  try {
    let document = await Student.find({ tutor: tutor, deleted: false })
      .populate('groups')
      .populate('tutor')
      .populate('user');
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByUser = async (request, response) => {
  let user = request.body.user;
  try {
    let document = await Student.findOne({ user: user, deleted: false })
      .populate('groups')
      .populate('tutor')
      .populate('user');
    if (document) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const log = async (request, response) => {
  let {
    niev,
    name,
    paternalSurname,
    maternalSurname,
    curp,
    address,
    emailAddress,
    phone,
    groups,
    tutor,
    user,
  } = request.body;
  try {
    let student = await Student.findOne({ niev: niev, deleted: false });
    if (!student) {
      student = new Student({
        niev: niev,
        name: name,
        paternalSurname: paternalSurname,
        maternalSurname: maternalSurname,
        curp: curp,
        address: address,
        emailAddress: emailAddress,
        phone: phone,
        groups: groups,
        tutor: tutor,
        user: user,
      });
      let document = await student.save();
      response.status(code.CREATED).send(json(body.POST, document));
    } else {
      response.status(code.BAD_REQUEST).send({ error: body.ENRROLLED });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const remove = async (request, response) => {
  let id = request.body.id;
  try {
    let document = await Student.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    )
      .populate('groups')
      .populate('tutor')
      .populate('user');
    if (document) {
      response.status(code.OK).send(json(body.DELETE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  let id = request.body.id;
  try {
    let document = await Student.findByIdAndUpdate(id, request.body, {
      new: true,
    })
      .populate('groups')
      .populate('tutor')
      .populate('user');
    if (document) {
      response.status(code.OK).send(json(body.PUT, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
