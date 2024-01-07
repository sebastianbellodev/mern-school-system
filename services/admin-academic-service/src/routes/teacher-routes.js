import Router from 'express';
import {
  get,
  getByEmailAddress,
  getByGroup,
  getById,
  getBySubject,
  getByUser,
  log,
  remove,
  update,
} from '../controllers/teacher-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/teacher', isValidToken, remove);
router.get('/teacher', isValidToken, get);
router.post('/teacher', isValidToken, log);
router.post('/teacher/emailaddress', isValidToken, getByEmailAddress);
router.post('/teacher/group', isValidToken, getByGroup);
router.post('/teacher/id', isValidToken, getById);
router.post('/teacher/subject', isValidToken, getBySubject);
router.post('/teacher/user', isValidToken, getByUser);
router.put('/teacher', isValidToken, update);

export default router;
