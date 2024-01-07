import Router from 'express';
import {
  get,
  getByGroup,
  getById,
  getByJobTraining,
  log,
  remove,
  update,
} from '../controllers/subject-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/subject', isValidToken, remove);
router.get('/subject', isValidToken, get);
router.get('/subject/jobtraining', isValidToken, getByJobTraining);
router.post('/subject', isValidToken, log);
router.post('/subject/group', isValidToken, getByGroup);
router.post('/subject/id', isValidToken, getById);
router.put('/subject', isValidToken, update);

export default router;
