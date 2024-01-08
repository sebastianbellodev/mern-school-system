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

router.delete('/tutor/:id', isValidToken, remove);
router.get('/tutor', isValidToken, get);
router.get(
  '/tutor/emailaddress/:emailAddress',
  isValidToken,
  getByEmailAddress
);
router.get('/tutor/id/:id', isValidToken, getById);
router.post('/tutor', isValidToken, log);
router.put('/tutor', isValidToken, update);

export default router;
