import Router from 'express';
import {
  get,
  getById,
  getByTitle,
  log,
  remove,
  update,
} from '../controllers/format-controller.js';
import { isValidAuth } from '../security/basic.js';
import fileUpload from 'express-fileupload';

const router = Router();

router.get('/format', isValidAuth, get);
router.post(
  '/format',
  isValidAuth,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  log
);
router.post('/format/id', isValidAuth, getById);
router.post('/format/title', isValidAuth, getByTitle);
router.put('/format', isValidAuth, remove);
router.put(
  '/format',
  isValidAuth,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  update
);

export default router;
