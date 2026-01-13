import express from 'express';
import { createGigController, getGigsController, getGigByIdController, getMyGigsController } from '../controllers/gig.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getGigsController);
router.post('/', auth, createGigController);
router.get('/my', auth, getMyGigsController);
router.get('/:id', getGigByIdController);

export default router;
