import express from 'express';
import { updateProfileController } from '../controllers/profile.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.put('/', auth, updateProfileController);

export default router;
