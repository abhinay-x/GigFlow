import Gig from '../models/Gig.js';
import Bid from '../models/Bid.js';

export const createGig = async ({ title, description, budget, budgetType, skillsRequired, deadline, ownerId }) => {
  const normalizedSkills = Array.isArray(skillsRequired)
    ? skillsRequired.map((s) => String(s).trim()).filter(Boolean)
    : [];

  const normalizedDeadline = deadline ? new Date(deadline) : null;
  if (normalizedDeadline && Number.isNaN(normalizedDeadline.getTime())) {
    throw new Error('Invalid deadline');
  }

  const gig = await Gig.create({
    title,
    description,
    budget,
    budgetType,
    skillsRequired: normalizedSkills,
    deadline: normalizedDeadline,
    ownerId
  });
  return gig;
};

export const getGigs = async (search = '', statusFilter = '') => {
  let query = {};

  if (search) {
    query.title = { $regex: search, $options: 'i' };
  }

  if (statusFilter) {
    query.status = statusFilter;
  }

  const gigs = await Gig.find(query)
    .populate('ownerId', 'name email')
    .sort({ createdAt: -1 });

  return gigs;
};

export const getGigById = async (gigId) => {
  const gig = await Gig.findById(gigId)
    .populate('ownerId', 'name email')
    .populate('assignedFreelancerId', 'name email')
    .populate('assignedBidId');
  if (!gig) {
    throw new Error('Gig not found');
  }
  return gig;
};

export const getGigsByOwner = async (ownerId) => {
  const gigs = await Gig.find({ ownerId })
    .populate('assignedBidId')
    .populate('assignedFreelancerId', 'name email')
    .sort({ createdAt: -1 });
  return gigs;
};

export const updateGigStatus = async (gigId, status) => {
  const gig = await Gig.findByIdAndUpdate(
    gigId,
    { status },
    { new: true, runValidators: true }
  );
  if (!gig) {
    throw new Error('Gig not found');
  }
  return gig;
};
