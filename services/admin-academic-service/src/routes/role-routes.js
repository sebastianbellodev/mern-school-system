import Router from 'express';
import {
  get,
  getById,
  getByName,
  log,
  remove,
  update,
} from '../controllers/role-controller.js';
import isValidToken from '../security/jwt.js';

const router = Router();

router.delete('/role', isValidToken, remove);
router.get('/role', isValidToken, get);
router.get('/role/id', isValidToken, getById);
router.get('/role/name', isValidToken, getByName);
router.post('/role', isValidToken, log);
router.put('/role', isValidToken, update);

export default router;
