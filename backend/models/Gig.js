import mongoose from 'mongoose';

const gigSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  budgetType: {
    type: String,
    enum: ['fixed', 'hourly'],
    default: 'fixed',
    index: true
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [1, 'Budget must be at least 1']
  },
  skillsRequired: [{
    type: String,
    trim: true
  }],
  deadline: {
    type: Date,
    default: null,
    index: true
  },
  assignedBidId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bid',
    default: null,
    index: true
  },
  assignedFreelancerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    index: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ['open', 'assigned'],
    default: 'open',
    index: true
  }
}, {
  timestamps: true
});

gigSchema.index({ ownerId: 1, status: 1 });
gigSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model('Gig', gigSchema);
