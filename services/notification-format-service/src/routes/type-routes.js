import Router from 'express';
import {
  get,
  getById,
  getByName,
  log,
  remove,
  update,
} from '../controllers/type-controller.js';
import { isValidAuth } from '../security/basic.js';

const router = Router();

router.get('/type', isValidAuth, get);
router.post('/type', isValidAuth, log);
router.post('/type/id', isValidAuth, getById);
router.post('/type/name', isValidAuth, getByName);
router.put('/type', isValidAuth, remove);
router.put('/type', isValidAuth, update);

export default router;
