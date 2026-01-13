import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
  bidId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid',
    required: true,
    unique: true,
    index: true
  },
  gigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gig',
    required: true,
    index: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  freelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  lastMessageAt: {
    type: Date,
    default: null,
    index: true
  }
}, {
  timestamps: true
});

conversationSchema.index({ ownerId: 1, lastMessageAt: -1 });
conversationSchema.index({ freelancerId: 1, lastMessageAt: -1 });

export default mongoose.model('Conversation', conversationSchema);
