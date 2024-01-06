import body from '../tools/body.js';
import code from '../tools/code.js';
import Format from '../models/format-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      formats: document.map((format) => ({
        id: format._id,
        title: format.title,
        file: format.file,
        deleted: format.deleted,
      })),
    };
  } else {
    return {
      message,
      format: {
        id: document._id,
        title: document.title,
        file: document.file,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    const document = await Format.find({ deleted: false });
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
  const id = request.body.id;
  try {
    const document = await Format.findOne({ _id: id, deleted: false });
    if (document) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByTitle = async (request, response) => {
  const title = request.body.title;
  try {
    const document = await Format.findOne({ title: title, deleted: false });
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
  const { title, file } = request.body;
  try {
    let format = await Format.findOne({ title: title, deleted: false });
    if (!format) {
      format = new Format({ title: title, file: file });
      const document = await format.save();
      response.status(code.CREATED).send(json(body.POST, document));
    } else {
      response.status(code.BAD_REQUEST).send({ error: body.ENRROLLED });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const remove = async (request, response) => {
  const id = request.body.id;
  try {
    const document = await Format.findByIdAndUpdate(
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
    const document = await Format.findByIdAndUpdate(id, request.body, {
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
