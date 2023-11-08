import { Router } from 'express';

import { signup, login, logout, user } from '../controllers/user-controller.js';
import { isValidToken } from '../security/jwt.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.get('/:username', isValidToken, user);

export default router;
