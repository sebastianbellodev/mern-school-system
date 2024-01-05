import Router from 'express';
import {
  get,
  getById,
  getByName,
  log,
  remove,
  update,
} from '../controllers/type-controller.js';
import { isValidToken } from '../security/jwt.js';
import { isValidAuth } from '../security/basic.js';

const router = Router();

router.delete('/type', isValidAuth, remove);
router.get('/type', isValidAuth, get);
router.get('/type/id', isValidAuth, getById);
router.get('/type/name', isValidAuth, getByName);
router.post('/type', isValidAuth, log);
router.put('/type', isValidAuth, update);

export default router;
