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

router.get('/notification', isValidAuth, get);
router.get('/notification/date', isValidAuth, getByDate);
router.post(
  '/notification',
  isValidAuth,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  log
);
router.post('/notification/id', isValidAuth, getById);
router.post('/notification/title', isValidAuth, getByTitle);
router.post('/notification/type', isValidAuth, getByType);
router.put('/notification', isValidAuth, remove);
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
