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

router.delete('/semester/:id', isValidToken, remove);
router.get('/semester', isValidToken, get);
router.get('/semester/date', isValidToken, getByDate);
router.get('/semester/id/:id', isValidToken, getById);
router.post('/semester', isValidToken, log);
router.put('/semester', isValidToken, update);

export default router;
