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

router.delete('/group/:id', isValidToken, remove);
router.get('/group', isValidToken, get);
router.get('/group/id/:id', isValidToken, getById);
router.get('/group/number/:number', isValidToken, getByNumber);
router.post('/group', isValidToken, log);
router.put('/group', isValidToken, update);

export default router;
