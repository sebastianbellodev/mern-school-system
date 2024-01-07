import Router from 'express';
import {
  get,
  getByGroup,
  getById,
  getByName,
  log,
  remove,
  update,
} from '../controllers/propadeutic-area-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/propadeuticarea', isValidToken, remove);
router.get('/propadeuticarea', isValidToken, get);
router.post('/propadeuticarea', isValidToken, log);
router.post('/propadeuticarea/group', isValidToken, getByGroup);
router.post('/propadeuticarea/id', isValidToken, getById);
router.post('/propadeuticarea/name', isValidToken, getByName);
router.put('/propadeuticarea', isValidToken, update);

export default router;
