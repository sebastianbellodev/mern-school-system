import body from '../tools/body.js';
import code from '../tools/code.js';
import Grade from '../models/grade-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      grades: document.map((grade) => ({
        id: grade._id,
        number: grade.number,
        partial: grade.partial,
        student: grade.student,
        subject: grade.subject,
        deleted: grade.deleted,
      })),
    };
  } else {
    return {
      message,
      grade: {
        id: document._id,
        number: document.number,
        partial: document.partial,
        student: document.student,
        subject: document.subject,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await Grade.find({ deleted: false });
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
    let document = await Grade.findOne({ _id: id, deleted: false });
    if (document) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByNumber = async (request, response) => {
  let number = request.body.number;
  try {
    let document = await Grade.find({ number: number, deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByPartial = async (request, response) => {
  let partial = request.body.partial;
  try {
    let document = await Grade.find({ partial: partial, deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByStudent = async (request, response) => {
  let student = request.body.student;
  try {
    let document = await Grade.find({ student: student, deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getBySubject = async (request, response) => {
  let subject = request.body.subject;
  try {
    let document = await Grade.find({ subject: subject, deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const log = async (request, response) => {
  let { number, partial, student, subject } = request.body;
  try {
    let grade = await Grade.findOne({
      partial: partial,
      student: student,
      subject: subject,
      deleted: false,
    });
    if (!grade) {
      grade = new Grade({
        number: number,
        partial: partial,
        student: student,
        subject: subject,
      });
      let document = await grade.save();
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
    let grade = await Grade.findOne({ _id: id, deleted: false });
    if (grade) {
      grade.deleted = true;
      let document = await grade.save();
      response.status(code.OK).send(json(body.DELETE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  let { id, number, partial, student, subject } = request.body;
  try {
    let grade = await Grade.findOne({
      number: number,
      partial: partial,
      student: student,
      subject: subject,
    });
    if (!grade) {
      grade = await Grade.findOne({ _id: id, deleted: false });
      if (grade) {
        grade.number = number;
        grade.partial = partial;
        grade.student = student;
        grade.subject = subject;
        let document = await grade.save();
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
