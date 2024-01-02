import Router from 'express';
import {
  get,
  getByDate,
  getById,
  getByTitle,
  getByType,
  log,
  remove,
  update,
} from '../controllers/notification-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/notification', isValidToken, remove);
router.get('/notification', isValidToken, get);
router.get('/notification/date', isValidToken, getByDate);
router.get('/notification/id', isValidToken, getById);
router.get('/notification/title', isValidToken, getByTitle);
router.get('/notification/type', isValidToken, getByType);
router.post('/notification', isValidToken, log);
router.put('/notification', isValidToken, update);

export default router;
