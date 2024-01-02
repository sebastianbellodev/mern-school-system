import Router from 'express';
import {
  get,
  getById,
  getByTitle,
  log,
  remove,
  update,
} from '../controllers/format-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/format', isValidToken, remove);
router.get('/format', isValidToken, get);
router.get('/format/id', isValidToken, getById);
router.get('/format/title', isValidToken, getByTitle);
router.post('/format', isValidToken, log);
router.put('/format', isValidToken, update);

export default router;
