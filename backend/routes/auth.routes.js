import express from 'express';
import { registerController, loginController, getMeController, logoutController } from '../controllers/auth.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);
router.get('/me', auth, getMeController);
router.post('/logout', logoutController);

export default router;
