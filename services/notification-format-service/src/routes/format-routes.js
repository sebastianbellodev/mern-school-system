import Router from 'express';
import fileUpload from 'express-fileupload';
import {
  get,
  getById,
  getByTitle,
  log,
  remove,
  update,
} from '../controllers/format-controller.js';
import { isValidAuth } from '../security/basic.js';

const router = Router();

router.delete('/format/:id', isValidAuth, remove);
router.get('/format', isValidAuth, get);
router.get('/format/:id', isValidAuth, getById);
router.post(
  '/format',
  isValidAuth,
  fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads',
  }),
  log
);
router.post('/format/title', isValidAuth, getByTitle);
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
