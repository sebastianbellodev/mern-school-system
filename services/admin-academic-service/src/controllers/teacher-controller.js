import body from '../tools/body.js';
import code from '../tools/code.js';
import Teacher from '../models/teacher-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      teachers: document.map((teacher) => ({
        id: teacher._id,
        name: teacher.name,
        paternalSurname: teacher.paternalSurname,
        maternalSurname: teacher.maternalSurname,
        emailAddress: teacher.emailAddress,
        groups: teacher.groups,
        subjects: teacher.subjects,
        user: teacher.user,
        deleted: teacher.deleted,
      })),
    };
  } else {
    return {
      message,
      teacher: {
        id: document._id,
        name: document.name,
        paternalSurname: document.paternalSurname,
        maternalSurname: document.maternalSurname,
        emailAddress: document.emailAddress,
        groups: document.groups,
        subjects: document.subjects,
        user: document.user,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await Teacher.find({ deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByEmailAddress = async (request, response) => {
  let emailAddress = request.body.emailAddress;
  try {
    let document = await Teacher.findOne({
      emailAddress: emailAddress,
      deleted: false,
    });
    if (document) {
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
    let document = await Teacher.find({ groups: group, deleted: false });
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
    let document = await Teacher.findOne({ _id: id, deleted: false });
    if (document) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getBySubject = async (request, response) => {
  let subject = request.body.subjects[0];
  try {
    let document = await Teacher.find({ subjects: subject, deleted: deleted });
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
    let document = await Teacher.findOne({ user: user, deleted: false });
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
    name,
    paternalSurname,
    maternalSurname,
    emailAddress,
    groups,
    subjects,
    user,
  } = request.body;
  try {
    let teacher = await Teacher.findOne({
      emailAddress: emailAddress,
      deleted: false,
    });
    if (!teacher) {
      teacher = new Teacher({
        name: name,
        paternalSurname: paternalSurname,
        maternalSurname: maternalSurname,
        emailAddress: emailAddress,
        groups: groups,
        subjects: subjects,
        user: user,
      });
      let document = await teacher.save();
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
    let teacher = await Teacher.findOne({ _id: id, deleted: false });
    if (teacher) {
      teacher.deleted = true;
      let document = await teacher.save();
      response.status(code.OK).send(json(body.DELETE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  let {
    id,
    name,
    paternalSurname,
    maternalSurname,
    emailAddress,
    groups,
    subjects,
    user,
  } = request.body;
  try {
    let teacher = await Teacher.findOne({
      emailAddress: emailAddress,
      deleted: false,
    });
    if (!teacher) {
      teacher = await Teacher.findOne({ _id: id, deleted: false });
      if (teacher) {
        teacher.name = name;
        teacher.paternalSurname = paternalSurname;
        teacher.maternalSurname = maternalSurname;
        teacher.emailAddress = emailAddress;
        teacher.groups = groups;
        teacher.subjects = subjects;
        teacher.user = user;
        let document = await teacher.save();
        response.status(code.OK).send(json(body.PUT, document));
      } else {
        response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
      }
    } else {
      response.status(code.BAD_REQUEST).send({ error: body.ENRROLLED });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
