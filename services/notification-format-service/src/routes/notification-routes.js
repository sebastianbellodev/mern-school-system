import Router from 'express';
import fileUpload from 'express-fileupload';
import {
  get,
  getByDate,
  getById,
  getByTitle,
  getByType,
  log,
  remove,
  update,
} from '../controllers/notification-controller.js';
import { isValidAuth } from '../security/basic.js';

const router = Router();

router.delete('/notification/:id', isValidAuth, remove);
router.get('/notification', isValidAuth, get);
router.get('/notification/date', isValidAuth, getByDate);
router.get('/notification/id/:id', isValidAuth, getById);
router.get('/notification/type/:type', isValidAuth, getByType);
router.post(
  '/notification',
  isValidAuth,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  log
);
router.post('/notification/title', isValidAuth, getByTitle);
router.put(
  '/notification',
  isValidAuth,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  update
);

export default router;
