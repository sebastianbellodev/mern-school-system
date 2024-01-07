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
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/partial', isValidToken, remove);
router.get('/partial', isValidToken, get);
router.get('/partial/date', isValidToken, getByDate);
router.post('/partial', isValidToken, log);
router.post('/partial/id', isValidToken, getById);
router.post('/partial/number', isValidToken, getByNumber);
router.post('/partial/semester', isValidToken, getBySemester);
router.put('/partial', isValidToken, update);

export default router;
