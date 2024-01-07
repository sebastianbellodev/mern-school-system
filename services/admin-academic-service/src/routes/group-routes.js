import Router from 'express';
import {
  get,
  getById,
  getByNumber,
  log,
  remove,
  update,
} from '../controllers/group-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/group', isValidToken, remove);
router.get('/group', isValidToken, get);
router.post('/group', isValidToken, log);
router.post('/group/id', isValidToken, getById);
router.post('/group/number', isValidToken, getByNumber);
router.put('/group', isValidToken, update);

export default router;
