import { Router } from 'express';

import { signup, login, logout, user } from '../controllers/user-controller.js';
import { isValidToken } from '../security/jwt.js';
import { isValidAuth } from '../security/basic.js';

const router = Router();

router.post('/signup', isValidAuth, signup);
router.post('/login', isValidAuth, login);
router.post('/logout', logout);
router.get('/:username', isValidToken, user);

export default router;
