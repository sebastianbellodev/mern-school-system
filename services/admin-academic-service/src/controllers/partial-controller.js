import body from '../tools/body.js';
import code from '../tools/code.js';
import Partial from '../models/partial-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      partials: document.map((partial) => ({
        id: partial._id,
        number: partial.number,
        startDate: partial.startDate,
        endDate: partial.endDate,
        semester: partial.semester,
        deleted: partial.deleted,
      })),
    };
  } else {
    return {
      message,
      partial: {
        id: document._id,
        number: document.number,
        startDate: document.startDate,
        endDate: document.endDate,
        semester: document.semester,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await Partial.find({ deleted: false }).populate('semester');
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
    let document = await Partial.find({
      startDate: { $lte: date },
      endDate: { $gte: date },
      deleted: false,
    }).populate('semester');
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
    let document = await Partial.findOne({ _id: id, deleted: false }).populate(
      'semester'
    );
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
    let document = await Partial.find({
      number: number,
      deleted: false,
    }).populate('semester');
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getBySemester = async (request, response) => {
  let semester = request.body.semester;
  try {
    let document = await Partial.find({
      semester: semester,
      deleted: false,
    }).populate('semester');
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
  let { number, startDate, endDate, semester } = request.body;
  try {
    let partial = await Partial.findOne({
      number: number,
      startDate: startDate,
      endDate: endDate,
      semester: semester,
      deleted: false,
    });
    if (!partial) {
      partial = new Partial({
        number: number,
        startDate: startDate,
        endDate: endDate,
        semester: semester,
      });
      let document = await partial.save();
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
    let document = await Partial.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    ).populate('semester');
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
    let document = await Partial.findByIdAndUpdate(id, request.body, {
      new: true,
    }).populate('semester');
    if (document) {
      response.status(code.OK).send(json(body.PUT, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
