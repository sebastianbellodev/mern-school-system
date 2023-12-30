import Router from 'express';
import {
  getByUsername,
  login,
  logOut,
  remove,
  signUp,
  update,
} from '../controllers/user-controller.js';
import isValidToken from '../security/jwt.js';
import isValidAuth from '../security/basic.js';

const router = Router();

router.delete(':/username', isValidToken, remove);
router.get('/:username', isValidToken, getByUsername);
router.post('/login', isValidAuth, login);
router.post('/logout', logOut);
router.post('/signup', isValidAuth, signUp);
router.put('/:username', isValidToken, update);

export default router;
