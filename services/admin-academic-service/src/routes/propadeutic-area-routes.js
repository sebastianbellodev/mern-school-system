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

router.delete('/propadeuticarea/:id', isValidToken, remove);
router.get('/propadeuticarea', isValidToken, get);
router.get('/propadeuticarea/group/:group', isValidToken, getByGroup);
router.get('/propadeuticarea/id/:id', isValidToken, getById);
router.post('/propadeuticarea', isValidToken, log);
router.post('/propadeuticarea/name', isValidToken, getByName);
router.put('/propadeuticarea', isValidToken, update);

export default router;
