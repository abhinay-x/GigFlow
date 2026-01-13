import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'gigflow_notifications_v1';

const safeParse = (value, fallback) => {
  try {
    const parsed = JSON.parse(value);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const loadFromStorage = () => {
  if (typeof window === 'undefined') return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const parsed = safeParse(raw, []);
  return Array.isArray(parsed) ? parsed : [];
};

const saveToStorage = (notifications) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
};

const computeUnreadCount = (notifications) => notifications.reduce((sum, n) => sum + (!n.read ? 1 : 0), 0);

const initialNotifications = loadFromStorage();

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    notifications: initialNotifications,
    unreadCount: computeUnreadCount(initialNotifications)
  },
  reducers: {
    addNotification: (state, action) => {
      const payload = action.payload || {};
      const createdAt = payload.createdAt || new Date().toISOString();
      const id = payload.id || `${createdAt}_${Math.random().toString(16).slice(2)}`;

      const next = {
        ...payload,
        id,
        createdAt,
        read: false
      };

      state.notifications.unshift(next);
      state.unreadCount = computeUnreadCount(state.notifications);
      saveToStorage(state.notifications);
    },
    markAllRead: (state) => {
      state.notifications = state.notifications.map((n) => ({ ...n, read: true }));
      state.unreadCount = 0;
      saveToStorage(state.notifications);
    },
    markRead: (state, action) => {
      const id = action.payload;
      state.notifications = state.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      state.unreadCount = computeUnreadCount(state.notifications);
      saveToStorage(state.notifications);
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
      saveToStorage(state.notifications);
    }
  }
});

export const { addNotification, markAllRead, markRead, clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;
