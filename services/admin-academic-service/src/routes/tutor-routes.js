import Router from 'express';
import {
  get,
  getByEmailAddress,
  getById,
  log,
  remove,
  update,
} from '../controllers/tutor-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/tutor', isValidToken, remove);
router.get('/tutor', isValidToken, get);
router.post('/tutor', isValidToken, log);
router.post('/tutor/emailaddress', isValidToken, getByEmailAddress);
router.post('/tutor/id', isValidToken, getById);
router.put('/tutor', isValidToken, update);

export default router;
