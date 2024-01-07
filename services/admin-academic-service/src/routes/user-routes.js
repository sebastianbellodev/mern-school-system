import Router from 'express';
import {
  get,
  getById,
  getByRole,
  getByUsername,
  login,
  logOut,
  remove,
  signUp,
  update,
  token,
} from '../controllers/user-controller.js';
import { isValidAuth } from '../security/basic.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.delete('/user', isValidToken, remove);
router.get('/user', isValidToken, get);
router.post('/user/id', isValidToken, getById);
router.post('/user/login', isValidAuth, login);
router.post('/user/logout', logOut);
router.post('/user/role', isValidToken, getByRole);
router.post('/user/signup', isValidAuth, signUp);
router.post('/user/username', isValidToken, getByUsername);
router.put('/user', isValidToken, update);
router.get('/token', isValidAuth, token);

export default router;
