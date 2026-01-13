import express from 'express';
import { auth } from '../middlewares/auth.middleware.js';
import {
  getOrCreateConversationByBidController,
  getMyConversationsController,
  getMessagesController,
  sendMessageController,
  editMessageController,
  deleteMessageController
} from '../controllers/conversation.controller.js';

const router = express.Router();

router.get('/my', auth, getMyConversationsController);
router.post('/bid/:bidId', auth, getOrCreateConversationByBidController);
router.get('/:conversationId/messages', auth, getMessagesController);
router.post('/:conversationId/messages', auth, sendMessageController);
router.patch('/messages/:messageId', auth, editMessageController);
router.delete('/messages/:messageId', auth, deleteMessageController);

export default router;
