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

router.delete('/format', isValidAuth, remove);
router.get('/format', isValidAuth, get);
router.get('/format/:id', isValidAuth, getById);
router.get('/format/title', isValidAuth, getByTitle);
router.post(
  '/format',
  isValidAuth,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  log
);
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
