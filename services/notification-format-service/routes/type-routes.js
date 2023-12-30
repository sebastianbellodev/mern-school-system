import Router from 'express';
import {
  get,
  getById,
  getByName,
  log,
  remove,
  update,
} from '../controllers/type-controller.js';
import isValidToken from '../security/jwt.js';

const router = Router();

router.delete('/type', isValidToken, remove);
router.get('/type', isValidToken, get);
router.get('/type/id', isValidToken, getById);
router.get('/type/name', isValidToken, getByName);
router.post('/type', isValidToken, log);
router.put('/type', isValidToken, update);

export default router;
