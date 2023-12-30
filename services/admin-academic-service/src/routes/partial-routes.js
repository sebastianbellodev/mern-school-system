import Router from 'express';
import {
  get,
  getByDate,
  getById,
  getByNumber,
  getBySemester,
  log,
  remove,
  update,
} from '../controllers/partial-controller.js';
import isValidToken from '../security/jwt.js';

const router = Router();

router.delete('/partial', isValidToken, remove);
router.get('/partial', isValidToken, get);
router.get('/partial/date', isValidToken, getByDate);
router.get('/partial/id', isValidToken, getById);
router.get('/partial/number', isValidToken, getByNumber);
router.get('/partial/semester', isValidToken, getBySemester);
router.post('/partial', isValidToken, log);
router.put('/partial', isValidToken, update);

export default router;
