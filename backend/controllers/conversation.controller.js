import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';

const ensureConversationAccess = async (conversationId, userId) => {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    throw new Error('Conversation not found');
  }

  const isParticipant =
    conversation.ownerId.toString() === userId.toString() ||
    conversation.freelancerId.toString() === userId.toString();

  if (!isParticipant) {
    throw new Error('Not authorized');
  }

  return conversation;
};

export const getOrCreateConversationByBidController = async (req, res) => {
  try {
    const { bidId } = req.params;
    const userId = req.user._id;

    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }

    const gig = await Gig.findById(bid.gigId);
    if (!gig) {
      return res.status(404).json({ message: 'Gig not found' });
    }

    const isOwner = gig.ownerId.toString() === userId.toString();
    const isFreelancer = bid.freelancerId.toString() === userId.toString();

    if (!isOwner && !isFreelancer) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    let conversation = await Conversation.findOne({ bidId: bid._id });

    if (!conversation) {
      conversation = await Conversation.create({
        bidId: bid._id,
        gigId: gig._id,
        ownerId: gig.ownerId,
        freelancerId: bid.freelancerId,
        lastMessageAt: null
      });
    }

    const populated = await Conversation.findById(conversation._id)
      .populate('gigId')
      .populate('ownerId', 'name email')
      .populate('freelancerId', 'name email');

    res.json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyConversationsController = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      $or: [{ ownerId: userId }, { freelancerId: userId }]
    })
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .populate('gigId')
      .populate('ownerId', 'name email')
      .populate('freelancerId', 'name email');

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMessagesController = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    await ensureConversationAccess(conversationId, userId);

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .populate('senderId', 'name email');

    res.json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const sendMessageController = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    const conversation = await ensureConversationAccess(conversationId, userId);

    const message = await Message.create({
      conversationId,
      senderId: userId,
      text: text.trim(),
      readBy: [userId]
    });

    conversation.lastMessageAt = new Date();
    await conversation.save();

    const populatedMessage = await Message.findById(message._id).populate('senderId', 'name email');

    const recipientId =
      conversation.ownerId.toString() === userId.toString()
        ? conversation.freelancerId.toString()
        : conversation.ownerId.toString();

    console.log('[message] sendMessage senderId:', userId.toString(), 'recipientId:', recipientId, 'conversationId:', conversation._id.toString());

    const io = req.app.get('io');
    if (io) {
      console.log('[socket] emit message:new to recipient', recipientId);
      io.to(recipientId).emit('message:new', {
        conversationId: conversation._id.toString(),
        message: populatedMessage
      });
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editMessageController = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Message text is required' });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const conversation = await ensureConversationAccess(message.conversationId, userId);

    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    message.text = text.trim();
    message.editedAt = new Date();
    await message.save();

    const populatedMessage = await Message.findById(message._id).populate('senderId', 'name email');

    const recipientId =
      conversation.ownerId.toString() === userId.toString()
        ? conversation.freelancerId.toString()
        : conversation.ownerId.toString();

    const io = req.app.get('io');
    if (io) {
      io.to(recipientId).emit('message:updated', {
        conversationId: conversation._id.toString(),
        message: populatedMessage
      });
    }

    res.json(populatedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMessageController = async (req, res) => {
  try {
    const { messageId } = req.params;
    const userId = req.user._id;

    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    const conversation = await ensureConversationAccess(message.conversationId, userId);

    if (message.senderId.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const conversationId = conversation._id.toString();
    await Message.findByIdAndDelete(messageId);

    const recipientId =
      conversation.ownerId.toString() === userId.toString()
        ? conversation.freelancerId.toString()
        : conversation.ownerId.toString();

    const io = req.app.get('io');
    if (io) {
      io.to(recipientId).emit('message:deleted', {
        conversationId,
        messageId: messageId.toString()
      });
    }

    res.json({ message: 'Message deleted', conversationId, messageId: messageId.toString() });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
