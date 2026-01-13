import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import gigReducer from './slices/gigSlice';
import bidReducer from './slices/bidSlice';
import notificationReducer from './slices/notificationSlice';
import profileReducer from './slices/profileSlice';
import conversationReducer from './slices/conversationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    gigs: gigReducer,
    bids: bidReducer,
    notifications: notificationReducer,
    profile: profileReducer,
    conversations: conversationReducer
  }
});

export default store;
