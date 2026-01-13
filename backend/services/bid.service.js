import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

export const createBid = async (gigId, freelancerId, message, price, io) => {
  const gig = await Gig.findById(gigId);
  if (!gig) {
    throw new Error('Gig not found');
  }

  console.log('[bid] createBid gigId:', gigId, 'ownerId:', gig.ownerId.toString(), 'freelancerId:', freelancerId);

  if (gig.status !== 'open') {
    throw new Error('Cannot bid on closed gig');
  }

  if (gig.ownerId.toString() === freelancerId) {
    throw new Error('Cannot bid on your own gig');
  }

  const existingBid = await Bid.findOne({ gigId, freelancerId });
  if (existingBid) {
    throw new Error('You have already bid on this gig');
  }

  const bid = await Bid.create({
    gigId,
    freelancerId,
    message,
    price
  });

  const populatedBid = await Bid.findById(bid._id)
    .populate('freelancerId', 'name email')
    .populate('gigId');

  if (io) {
    // Notify gig owner (client)
    console.log('[socket] emit notification bid -> owner', gig.ownerId.toString());
    io.to(gig.ownerId.toString()).emit('notification', {
      type: 'bid_received',
      message: `${populatedBid.freelancerId?.name || 'A freelancer'} placed a bid on ${gig.title}`,
      gig: gig,
      bid: populatedBid
    });

    // Notify all other users (freelancers), excluding the bidder and gig owner
    const otherUsers = await User.find({
      _id: { $nin: [gig.ownerId, freelancerId] }
    }).select('_id');

    console.log('[socket] emit notification bid -> other users count:', otherUsers.length);
    otherUsers.forEach((u) => {
      console.log('[socket] emit notification bid -> user', u._id.toString());
      io.to(u._id.toString()).emit('notification', {
        type: 'gig_new_bid',
        message: `New bid activity on ${gig.title}`,
        gig: gig,
        bid: populatedBid
      });
    });
  }

  return populatedBid;
};

export const getBidsByGig = async (gigId) => {
  const bids = await Bid.find({ gigId })
    .populate('freelancerId', 'name email')
    .sort({ createdAt: -1 });
  return bids;
};

export const getBidsByFreelancer = async (freelancerId) => {
  const bids = await Bid.find({ freelancerId })
    .populate('gigId')
    .sort({ createdAt: -1 });
  return bids;
};

export const hireFreelancer = async (bidId, ownerId, io) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const bid = await Bid.findById(bidId).session(session);
    if (!bid) {
      throw new Error('Bid not found');
    }

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) {
      throw new Error('Gig not found');
    }

    if (gig.ownerId.toString() !== ownerId.toString()) {
      throw new Error('You are not the owner of this gig');
    }

    if (gig.status !== 'open') {
      throw new Error('Gig is already assigned');
    }

    gig.status = 'assigned';
    gig.assignedBidId = bid._id;
    gig.assignedFreelancerId = bid.freelancerId;
    await gig.save({ session });

    bid.status = 'hired';
    await bid.save({ session });

    await Bid.updateMany(
      { gigId: bid.gigId, _id: { $ne: bidId } },
      { status: 'rejected' },
      { session }
    );

    await session.commitTransaction();

    const populatedBid = await Bid.findById(bidId)
      .populate('freelancerId', 'name email')
      .populate('gigId');

    if (io) {
      console.log('[socket] emit hired event to freelancer:', bid.freelancerId.toString());
      io.to(bid.freelancerId.toString()).emit('hired', {
        gigTitle: gig.title,
        message: `You have been hired for ${gig.title}!`,
        gig: gig,
        bid: populatedBid
      });

      console.log('[socket] emit notification gig_assigned to owner:', ownerId.toString());
      io.to(ownerId.toString()).emit('notification', {
        type: 'gig_assigned',
        message: `You hired ${populatedBid.freelancerId?.name || 'a freelancer'} for ${gig.title}`,
        gig: gig,
        bid: populatedBid
      });
    }

    return populatedBid;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const withdrawBid = async (bidId, freelancerId, io) => {
  const bid = await Bid.findById(bidId);
  if (!bid) {
    throw new Error('Bid not found');
  }

  if (bid.freelancerId.toString() !== freelancerId.toString()) {
    throw new Error('You are not the owner of this bid');
  }

  if (bid.status !== 'pending') {
    throw new Error('Can only withdraw pending bids');
  }

  const gig = await Gig.findById(bid.gigId);
  await Bid.findByIdAndDelete(bidId);

  if (io && gig) {
    console.log('[socket] emit notification bid_withdrawn -> owner', gig.ownerId.toString());
    io.to(gig.ownerId.toString()).emit('notification', {
      type: 'bid_withdrawn',
      message: `A freelancer withdrew their bid on ${gig.title}`,
      gig: gig,
      bidId: bidId
    });
  }

  return { message: 'Bid withdrawn successfully' };
};
