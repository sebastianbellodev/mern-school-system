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

router.delete('/student/:id', isValidToken, remove);
router.get('/student', isValidToken, get);
router.get('/student/group/:group', isValidToken, getByGroup);
router.get('/student/id/:id', isValidToken, getById);
router.get('/student/niev/:niev', isValidToken, getByNiev);
router.get('/student/tutor/:tutor', isValidToken, getByTutor);
router.get('/student/user/:user', isValidToken, getByUser);
router.post('/student', isValidToken, log);
router.put('/student', isValidToken, update);

export default router;
