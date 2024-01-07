import Router from 'express';
import {
  get,
  getByDate,
  getById,
  log,
  remove,
  update,
} from '../controllers/semester-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/semester', isValidToken, remove);
router.get('/semester', isValidToken, get);
router.get('/semester/date', isValidToken, getByDate);
router.post('/semester', isValidToken, log);
router.post('/semester/id', isValidToken, getById);
router.put('/semester', isValidToken, update);

export default router;
