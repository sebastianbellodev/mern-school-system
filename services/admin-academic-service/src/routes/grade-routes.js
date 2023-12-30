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
import isValidToken from '../security/jwt.js';

const router = Router();

router.delete('/grade', isValidToken, remove);
router.get('/grade', isValidToken, get);
router.get('/grade/id', isValidToken, getById);
router.get('/grade/number', isValidToken, getByNumber);
router.get('/grade/partial', isValidToken, getByPartial);
router.get('/grade/student', isValidToken, getByStudent);
router.get('/grade/subject', isValidToken, getBySubject);
router.post('/grade', isValidToken, log);
router.put('/grade', isValidToken, update);

export default router;
