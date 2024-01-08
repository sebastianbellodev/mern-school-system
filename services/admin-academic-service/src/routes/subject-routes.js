import Router from 'express';
import {
  get,
  getByGroup,
  getById,
  getByJobTraining,
  getByName,
  log,
  remove,
  update,
} from '../controllers/subject-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/subject/:id', isValidToken, remove);
router.get('/subject', isValidToken, get);
router.get('/subject/group/:group', isValidToken, getByGroup);
router.get('/subject/id/:id', isValidToken, getById);
router.get('/subject/jobtraining', isValidToken, getByJobTraining);
router.post('/subject', isValidToken, log);
router.post('/subject/name', isValidToken, getByName);
router.put('/subject', isValidToken, update);

export default router;
