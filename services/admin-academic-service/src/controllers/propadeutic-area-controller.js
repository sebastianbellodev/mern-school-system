import body from '../tools/body.js';
import code from '../tools/code.js';
import PropadeuticArea from '../models/propadeutic-area-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      propadeuticAreas: document.map((propadeuticArea) => ({
        id: propadeuticArea._id,
        name: propadeuticArea.name,
        groups: propadeuticArea.groups,
        deleted: propadeuticArea.deleted,
      })),
    };
  } else {
    return {
      message,
      propadeuticArea: {
        id: document._id,
        name: document.name,
        groups: document.groups,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    const document = await PropadeuticArea.find({ deleted: false }).populate(
      'groups'
    );
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
  const group = request.params.group;
  try {
    const document = await PropadeuticArea.findOne({
      groups: group,
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

export const getById = async (request, response) => {
  const id = request.params.id;
  try {
    const document = await PropadeuticArea.findOne({
      _id: id,
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

export const getByName = async (request, response) => {
  const name = request.body.name;
  try {
    const document = await PropadeuticArea.findOne({
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
  const { name, groups } = request.body;
  try {
    let propadeuticArea = await PropadeuticArea.findOne({
      name: name,
      deleted: false,
    });
    if (!propadeuticArea) {
      propadeuticArea = new PropadeuticArea({ name: name, groups: groups });
      let document = await propadeuticArea.save();
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
    const document = await PropadeuticArea.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    ).populate('groups');
    if (document) {
      response.stauts(code.OK).send(json(body.DELETE, document));
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
    const document = await PropadeuticArea.findByIdAndUpdate(id, request.body, {
      new: true,
    }).populate('groups');
    if (document) {
      response.stauts(code.OK).send(json(body.PUT, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
