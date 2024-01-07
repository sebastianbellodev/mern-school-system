import body from '../tools/body.js';
import code from '../tools/code.js';
import Group from '../models/group-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      groups: document.map((group) => ({
        id: group._id,
        number: group.number,
        deleted: group.deleted,
      })),
    };
  } else {
    return {
      message,
      group: {
        id: document._id,
        number: document.number,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    const document = await Group.find({ deleted: false });
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
    const document = await Group.findOne({ _id: id, deleted: false });
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
  const number = request.params.number;
  try {
    const document = await Group.findOne({ number: number, deleted: false });
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
  const number = request.body.number;
  try {
    let group = await Group.findOne({ number: number, deleted: false });
    if (!group) {
      group = new Group({ number: number });
      const document = await group.save();
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
    const document = await Group.findByIdAndUpdate(
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
  const id = request.body.id;
  try {
    const document = await Group.findByIdAndUpdate(id, request.body, {
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
