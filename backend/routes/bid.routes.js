import express from 'express';
import { createBidController, getBidsByGigController, getMyBidsController, hireFreelancerController, withdrawBidController } from '../controllers/bid.controller.js';
import { auth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', auth, createBidController);
router.get('/my', auth, getMyBidsController);
router.get('/gig/:gigId', getBidsByGigController);
router.patch('/:bidId/hire', auth, hireFreelancerController);
router.delete('/:bidId/withdraw', auth, withdrawBidController);

export default router;
