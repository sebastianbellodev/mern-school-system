import body from '../tools/body.js';
import code from '../tools/code.js';
import Subject from '../models/subject-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      subjects: document.map((subject) => ({
        id: subject._id,
        name: subject.name,
        isJobTraining: subject.isJobTraining,
        groups: subject.groups,
        deleted: subject.deleted,
      })),
    };
  } else {
    return {
      message,
      subject: {
        id: document._id,
        name: document.name,
        isJobTraining: document.isJobTraining,
        groups: document.groups,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await Subject.find({ deleted: false }).populate('groups');
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
    let document = await Subject.find({
      groups: group,
      deleted: false,
    }).populate('groups');
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
    let document = await Subject.findOne({ _id: id, deleted: false }).populate(
      'groups'
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

export const getByJobTraining = async (request, response) => {
  try {
    let document = await Subject.find({
      isJobTraining: true,
      deleted: false,
    }).populate('groups');
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByName = async (request, response) => {
  let name = request.body.name;
  try {
    let document = await Subject.findOne({
      name: name,
      deleted: false,
    }).populate('groups');
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
  let { name, isJobTraining, groups } = request.body;
  try {
    let subject = await Subject.findOne({ name: name, deleted: false });
    if (!subject) {
      subject = new Subject({
        name: name,
        isJobTraining: isJobTraining,
        groups: groups,
      });
      let document = await subject.save();
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
    let document = await Subject.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    ).populate('groups');
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
    let document = await Subject.findByIdAndUpdate(id, request.body, {
      new: true,
    }).populate('groups');
    if (document) {
      response.status(code.OK).send(json(body.PUT, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
