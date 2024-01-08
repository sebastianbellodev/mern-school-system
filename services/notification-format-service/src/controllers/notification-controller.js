import body from '../tools/body.js';
import code from '../tools/code.js';
import fs from 'fs-extra';
import Notification from '../models/notification-model.js';
import { uploadImage } from '../utils/cloudinary.js';

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
    const document = await Notification.find({ deleted: false }).populate(
      'type'
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

export const getByDate = async (request, response) => {
  const date = new Date();
  try {
    const document = await Notification.find({
      date: { $eq: date },
      deleted: false,
    }).populate('type');
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
    let document = await Notification.findOne({
      _id: id,
      deleted: false,
    }).populate('type');
    if (document) {
      response.status(code.OK).send(json(body.RETRIEVE, document));
    } else {
      response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
  } catch (error) {
    console.log(error);
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};

export const getByTitle = async (request, response) => {
  const title = request.body.title;
  try {
    const document = await Notification.find({
      title: title,
      deleted: false,
    }).populate('type');
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
  const type = request.params.type;
  try {
    const document = await Notification.find({
      type: type,
      deleted: false,
    }).populate('type');
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
  const { title, description, date, image, isSpinner, type } = request.body;
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
      if (request.files?.image) {
        const result = await uploadImage(request.files.image.tempFilePath);
        notification.image = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
        await fs.unlink(request.files.image.tempFilePath);
      }
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
  const id = request.params.id;
  try {
    const document = await Notification.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    ).populate('type');
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
    if (request.files?.image) {
      const result = await uploadImage(request.files.image.tempFilePath);
      request.body.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
      };
      await fs.unlink(request.files.image.tempFilePath);
    }
    const document = await Notification.findByIdAndUpdate(id, request.body, {
      new: true,
    }).populate('type');
    if (!document) {
      return response.status(code.NOT_FOUND).send({ error: body.NOT_FOUND });
    }
    response.status(code.CREATED).send(json(body.PUT, document));
  } catch (error) {
    response.status(code.INTERNAL_SERVER_ERROR).send({ error: body.ERROR });
  }
};
