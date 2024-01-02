import Router from 'express';
import {
  get,
  getByGroup,
  getById,
  getByNiev,
  getByTutor,
  getByUser,
  log,
  remove,
  update,
} from '../controllers/student-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/student', isValidToken, remove);
router.get('/student', isValidToken, get);
router.get('/student/group', isValidToken, getByGroup);
router.get('/student/id', isValidToken, getById);
router.get('/student/niev', isValidToken, getByNiev);
router.get('/student/tutor', isValidToken, getByTutor);
router.get('/student/user', isValidToken, getByUser);
router.post('/student', isValidToken, log);
router.put('/student', isValidToken, update);

export default router;
