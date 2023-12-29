import { Router } from 'express';

import {
  getUser,
  login,
  logOut,
  signUp,
  update,
} from '../controllers/user-controller.js';
import { isValidToken } from '../security/jwt.js';
import { isValidAuth } from '../security/basic.js';

const router = Router();

router.get('/:username', isValidToken, getUser);
router.post('/login', isValidAuth, login);
router.post('/logout', logOut);
router.post('/signup', isValidAuth, signUp);
router.put('/:username', isValidToken, update);

export default router;
