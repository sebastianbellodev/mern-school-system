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
    const document = await Grade.find({ deleted: false })
      .populate('partial')
      .populate('student')
      .populate('subject');
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
  const id = request.params.id;
  try {
    const document = await Grade.findOne({ _id: id, deleted: false })
      .populate('partial')
      .populate('student')
      .populate('subject');
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
  const number = request.body.number;
  try {
    const document = await Grade.find({ number: number, deleted: false })
      .populate('partial')
      .populate('student')
      .populate('subject');
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
  const partial = request.params.partial;
  try {
    const document = await Grade.find({ partial: partial, deleted: false })
      .populate('partial')
      .populate('student')
      .populate('subject');
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
  const student = request.params.student;
  try {
    const document = await Grade.find({ student: student, deleted: false })
      .populate('partial')
      .populate('student')
      .populate('subject');
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
  const subject = request.params.subject;
  try {
    const document = await Grade.find({ subject: subject, deleted: false })
      .populate('partial')
      .populate('student')
      .populate('subject');
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
  const { number, partial, student, subject } = request.body;
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
      const document = await grade.save();
      response.status(code.CREATED).send(json(body.POST, document));
    } else {
      response.status(code.BAD_REQUEST).send({ error: body.ENRROLLED });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const remove = async (request, response) => {
  const id = request.params.id;
  try {
    const document = await Grade.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    )
      .populate('partial')
      .populate('student')
      .populate('subject');
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
  const id = request.body.id;
  try {
    const document = await Grade.findByIdAndUpdate(id, request.body, {
      new: true,
    })
      .populate('partial')
      .populate('student')
      .populate('subject');
    if (document) {
      response.status(code.OK).send(json(body.PUT, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
