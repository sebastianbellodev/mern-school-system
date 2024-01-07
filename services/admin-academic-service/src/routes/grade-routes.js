import Router from 'express';
import {
  get,
  getById,
  getByNumber,
  getByPartial,
  getByStudent,
  getBySubject,
  log,
  remove,
  update,
} from '../controllers/grade-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/grade', isValidToken, remove);
router.get('/grade', isValidToken, get);
router.post('/grade', isValidToken, log);
router.post('/grade/id', isValidToken, getById);
router.post('/grade/number', isValidToken, getByNumber);
router.post('/grade/partial', isValidToken, getByPartial);
router.post('/grade/student', isValidToken, getByStudent);
router.post('/grade/subject', isValidToken, getBySubject);
router.put('/grade', isValidToken, update);

export default router;
