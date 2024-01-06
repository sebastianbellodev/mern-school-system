import body from '../tools/body.js';
import code from '../tools/code.js';
import Semester from '../models/semester-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      semesters: document.map((semester) => ({
        id: semester._id,
        startDate: semester.startDate,
        endDate: semester.endDate,
        deleted: semester.deleted,
      })),
    };
  } else {
    return {
      message,
      semester: {
        id: document._id,
        startDate: document.startDate,
        endDate: document.endDate,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await Semester.find({ deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByDate = async (request, response) => {
  let date = new Date();
  try {
    let document = await Semester.findOne({
      startDate: { $lte: date },
      endDate: { $gte: date },
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

export const getById = async (request, response) => {
  let id = request.body.id;
  try {
    let document = await Semester.findOne({ _id: id, deleted: false });
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
  let { startDate, endDate } = request.body;
  try {
    let semester = await Semester.findOne({
      startDate: startDate,
      endDate: endDate,
      deleted: false,
    });
    if (!semester) {
      semester = new Semester({ startDate: startDate, endDate: endDate });
      let document = await semester.save();
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
    let document = await Semester.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    );
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
    let document = await Semester.findByIdAndUpdate(id, request.body, {
      new: true,
    });
    if (document) {
      response.status(code.OK).send(json(body.PUT, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
