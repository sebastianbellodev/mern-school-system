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
router.post('/student', isValidToken, log);
router.post('/student/group', isValidToken, getByGroup);
router.post('/student/id', isValidToken, getById);
router.post('/student/niev', isValidToken, getByNiev);
router.post('/student/tutor', isValidToken, getByTutor);
router.post('/student/user', isValidToken, getByUser);
router.put('/student', isValidToken, update);

export default router;
