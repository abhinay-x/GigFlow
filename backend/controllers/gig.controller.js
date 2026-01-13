import { createGig, getGigs, getGigById, getGigsByOwner } from '../services/gig.service.js';
import User from '../models/User.js';

export const createGigController = async (req, res) => {
  try {
    const { title, description, budget, budgetType, skillsRequired, deadline } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const gig = await createGig({
      title,
      description,
      budget,
      budgetType,
      skillsRequired,
      deadline,
      ownerId: req.user._id
    });

    const io = req.app.get('io');
    if (io) {
      const otherUsers = await User.find({ _id: { $ne: req.user._id } }).select('_id');
      otherUsers.forEach((u) => {
        io.to(u._id.toString()).emit('notification', {
          type: 'gig_posted',
          message: `New gig posted: ${gig.title}`,
          gig
        });
      });
    }
    res.status(201).json(gig);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getGigsController = async (req, res) => {
  try {
    const { search, status } = req.query;
    const gigs = await getGigs(search, status);
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGigByIdController = async (req, res) => {
  try {
    const gig = await getGigById(req.params.id);
    res.json(gig);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getMyGigsController = async (req, res) => {
  try {
    const gigs = await getGigsByOwner(req.user._id);
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
