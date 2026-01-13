import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

export const getOrCreateConversationByBid = createAsyncThunk(
  'conversations/getOrCreateByBid',
  async (bidId, { rejectWithValue }) => {
    try {
      const response = await api.post(`/conversations/bid/${bidId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to open conversation');
    }
  }
);

export const fetchMessages = createAsyncThunk(
  'conversations/fetchMessages',
  async (conversationId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/conversations/${conversationId}/messages`);
      return { conversationId, messages: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages');
    }
  }
);

export const sendMessage = createAsyncThunk(
  'conversations/sendMessage',
  async ({ conversationId, text }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/conversations/${conversationId}/messages`, { text });
      return { conversationId, message: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

export const editMessage = createAsyncThunk(
  'conversations/editMessage',
  async ({ messageId, text }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/conversations/messages/${messageId}`, { text });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to edit message');
    }
  }
);

export const deleteMessage = createAsyncThunk(
  'conversations/deleteMessage',
  async (messageId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/conversations/messages/${messageId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete message');
    }
  }
);

const conversationSlice = createSlice({
  name: 'conversations',
  initialState: {
    activeConversation: null,
    messagesByConversationId: {},
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setActiveConversation: (state, action) => {
      state.activeConversation = action.payload;
    },
    addIncomingMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      const existing = state.messagesByConversationId[conversationId] || [];
      state.messagesByConversationId[conversationId] = [...existing, message];
      if (state.activeConversation && state.activeConversation._id === conversationId) {
        state.activeConversation.lastMessageAt = message.createdAt;
      }
    },
    updateIncomingMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      const existing = state.messagesByConversationId[conversationId] || [];
      state.messagesByConversationId[conversationId] = existing.map((m) =>
        m._id === message._id ? message : m
      );
    },
    removeIncomingMessage: (state, action) => {
      const { conversationId, messageId } = action.payload;
      const existing = state.messagesByConversationId[conversationId] || [];
      state.messagesByConversationId[conversationId] = existing.filter((m) => m._id !== messageId);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrCreateConversationByBid.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrCreateConversationByBid.fulfilled, (state, action) => {
        state.loading = false;
        state.activeConversation = action.payload;
      })
      .addCase(getOrCreateConversationByBid.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messagesByConversationId[action.payload.conversationId] = action.payload.messages;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        const { conversationId, message } = action.payload;
        const existing = state.messagesByConversationId[conversationId] || [];
        state.messagesByConversationId[conversationId] = [...existing, message];
      })
      .addCase(editMessage.fulfilled, (state, action) => {
        const updated = action.payload;
        const conversationId = updated.conversationId;
        const existing = state.messagesByConversationId[conversationId] || [];
        state.messagesByConversationId[conversationId] = existing.map((m) =>
          m._id === updated._id ? updated : m
        );
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        const { conversationId, messageId } = action.payload;
        const existing = state.messagesByConversationId[conversationId] || [];
        state.messagesByConversationId[conversationId] = existing.filter((m) => m._id !== messageId);
      });
  }
});

export const { clearError, setActiveConversation, addIncomingMessage, updateIncomingMessage, removeIncomingMessage } = conversationSlice.actions;
export default conversationSlice.reducer;
