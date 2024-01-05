import body from '../tools/body.js';
import code from '../tools/code.js';
import Notification from '../models/notification-model.js';

const json = (message, document) => {
  if (Array.isArray(document)) {
    return {
      message,
      notifications: document.map((notification) => ({
        id: notification._id,
        title: notification.title,
        description: notification.description,
        date: notification.date,
        image: notification.image,
        isSpinner: notification.isSpinner,
        type: notification.type,
        deleted: notification.deleted,
      })),
    };
  } else {
    return {
      message,
      notification: {
        id: document._id,
        title: document.title,
        description: document.description,
        date: document.date,
        image: document.image,
        isSpinner: document.isSpinner,
        type: document.type,
        deleted: document.deleted,
      },
    };
  }
};

export const get = async (request, response) => {
  try {
    let document = await Notification.find({ deleted: false });
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
    let document = await Notification.find({
      date: { $lte: date },
      deleted: false,
    });
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
    let document = await Notification.findOne({ _id: id, deleted: false });
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
  let title = request.body.title;
  try {
    let document = await Notification.find({ title: title, deleted: false });
    if (document.length > 0) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByType = async (request, response) => {
  let type = request.body.type;
  try {
    let document = await Notification.find({ type: type, deleted: false });
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
  let { title, description, date, image, isSpinner, type } = request.body;
  try {
    let notification = await Notification.findOne({
      title: title,
      description: description,
      date: date,
      image: image,
      isSpinner: isSpinner,
      type: type,
    });
    if (!notification) {
      notification = new Notification({
        title: title,
        description: description,
        date: date,
        image: image,
        isSpinner: isSpinner,
        type: type,
      });
      let document = await notification.save();
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
    let notification = await Notification.findOne({ _id: id, deleted: false });
    if (notification) {
      notification.deleted = true;
      let document = await notification.save();
      response.status(code.OK).send(json(body.DELETE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const update = async (request, response) => {
  let { id, title, description, date, image, isSpinner, type } = request.body;
  try {
    let notification = await Notification.findOne({
      title: title,
      description: description,
      date: date,
      image: image,
      isSpinner: isSpinner,
      type: type,
    });
    if (!notification) {
      notification = await Notification.findOne({ _id: id, deleted: false });
      if (notification) {
        notification.title = title;
        notification.description = description;
        notification.date = date;
        notification.image = image;
        notification.isSpinner = isSpinner;
        notification.type = type;
        let document = await notification.save();
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
