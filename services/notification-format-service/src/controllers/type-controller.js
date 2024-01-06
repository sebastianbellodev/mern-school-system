import body from '../tools/body.js';
import code from '../tools/code.js';
import Type from '../models/type-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      types: document.map((type) => ({
        id: type._id,
        name: type.name,
        deleted: type.deleted,
      })),
    };
  } else {
    return {
      message,
      type: {
        id: document._id,
        name: document.name,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await Type.find({ deleted: false });
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
    let document = await Type.findOne({ _id: id, deleted: false });
    if (document) {
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
    let document = await Type.findOne({ name: name, deleted: false });
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
  let name = request.body.name;
  try {
    let type = await Type.findOne({ name: name, deleted: false });
    if (!type) {
      type = new Type({ name: name });
      let document = await type.save();
      response.status(code.CREATED).send(json(body.POST, document));
    } else {
      response.status(code.BAD_REQUEST).send({ error: body.ENRROLLED });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const remove = async (request, response) => {
  try {
    const document = await Type.findByIdAndUpdate(
      request.body.id,
      {
        deleted: true,
      },
      {
        new: true,
      }
    );

    if (!document) {
      return response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }

    response.status(code.NO_CONTENT).send(json(body.DELETE, document));
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  try {
    const document = await Type.findByIdAndUpdate(
      request.body.id,
      request.body,
      {
        new: true,
      }
    );

    if (!document) {
      return response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }

    response.status(code.CREATED).send(json(body.PUT, document));
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
