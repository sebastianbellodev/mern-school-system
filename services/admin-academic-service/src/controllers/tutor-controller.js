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
    let document = await Tutor.find({ deleted: false });
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
  let emailAddress = request.body.emailAddress;
  try {
    let document = await Tutor.findOne({
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
  let id = request.body.id;
  try {
    let document = await Tutor.findOne({ _id: id, deleted: false });
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
  let { name, paternalSurname, maternalSurname, address, emailAddress, phone } =
    request.body;
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
      let document = await tutor.save();
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
    let tutor = await Tutor.findOne({ _id: id, deleted: false });
    if (tutor) {
      tutor.deleted = true;
      let document = await tutor.save();
      response.status(code.OK).send(json(body.DELETE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  let {
    id,
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
      tutor = await Tutor.findOne({ _id: id, deleted: false });
      if (tutor) {
        tutor.name = name;
        tutor.paternalSurname = paternalSurname;
        tutor.maternalSurname = maternalSurname;
        tutor.address = address;
        tutor.emailAddress = emailAddress;
        tutor.phone = phone;
        let document = await tutor.save();
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
