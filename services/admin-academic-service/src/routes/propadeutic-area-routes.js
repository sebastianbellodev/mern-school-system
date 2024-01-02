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
router.get('/propadeuticarea/group', isValidToken, getByGroup);
router.get('/propadeuticarea/id', isValidToken, getById);
router.get('/propadeuticarea/name', isValidToken, getByName);
router.post('/propadeuticarea', isValidToken, log);
router.put('/propadeuticarea', isValidToken, update);

export default router;
