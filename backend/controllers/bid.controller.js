import { createBid, getBidsByGig, getBidsByFreelancer, hireFreelancer, withdrawBid } from '../services/bid.service.js';

export const createBidController = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const io = req.app.get('io');
    const bid = await createBid(gigId, req.user._id, message, price, io);
    res.status(201).json(bid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBidsByGigController = async (req, res) => {
  try {
    const bids = await getBidsByGig(req.params.gigId);
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBidsController = async (req, res) => {
  try {
    const bids = await getBidsByFreelancer(req.user._id);
    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const hireFreelancerController = async (req, res) => {
  try {
    const io = req.app.get('io');
    const bid = await hireFreelancer(req.params.bidId, req.user._id, io);
    res.json(bid);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const withdrawBidController = async (req, res) => {
  try {
    const io = req.app.get('io');
    const result = await withdrawBid(req.params.bidId, req.user._id, io);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
