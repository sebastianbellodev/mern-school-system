import body from '../tools/body.js';
import code from '../tools/code.js';
import Tutor from '../models/tutor-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      tutors: document.map((tutor) => ({
        id: tutor._id,
        name: tutor.name,
        paternalSurname: tutor.paternalSurname,
        maternalSurname: tutor.maternalSurname,
        address: tutor.address,
        emailAddress: tutor.emailAddress,
        phone: tutor.phone,
        deleted: tutor.deleted,
      })),
    };
  } else {
    return {
      message,
      tutor: {
        id: document._id,
        name: document.name,
        paternalSurname: document.paternalSurname,
        maternalSurname: document.maternalSurname,
        address: document.address,
        emailAddress: document.emailAddress,
        phone: document.phone,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    const document = await Tutor.find({ deleted: false });
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
  const emailAddress = request.body.emailAddress;
  try {
    const document = await Tutor.findOne({
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

export const getById = async (request, response) => {
  const id = request.params.id;
  try {
    const document = await Tutor.findOne({ _id: id, deleted: false });
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
  const {
    name,
    paternalSurname,
    maternalSurname,
    address,
    emailAddress,
    phone,
  } = request.body;
  try {
    let tutor = await Tutor.findOne({
      emailAddress: emailAddress,
      deleted: false,
    });
    if (!tutor) {
      tutor = new Tutor({
        name: name,
        paternalSurname: paternalSurname,
        maternalSurname: maternalSurname,
        address: address,
        emailAddress: emailAddress,
        phone: phone,
      });
      const document = await tutor.save();
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
    const document = await Tutor.findByIdAndUpdate(
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
    const document = await Tutor.findByIdAndUpdate(id, request.body, {
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
