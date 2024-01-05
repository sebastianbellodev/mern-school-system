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
router.get('/user/id', isValidToken, getById);
router.get('/user/role', isValidToken, getByRole);
router.get('/user/username', isValidToken, getByUsername);
router.post('/user/login', isValidAuth, login);
router.post('/user/logout', logOut);
router.post('/user/signup', isValidAuth, signUp);
router.put('/user', isValidToken, update);
router.get('/token', isValidAuth, token);

export default router;
