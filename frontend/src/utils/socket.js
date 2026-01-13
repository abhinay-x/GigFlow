import io from 'socket.io-client';

let socket = null;
let currentUserId = null;
let connectionCount = 0;

export const initSocket = (userId) => {
  if (!userId) {
    console.log('[socket] initSocket called without userId, skipping');
    return null;
  }

  if (socket && currentUserId === userId) {
    console.log('[socket] reusing existing socket for userId:', userId);
    return socket;
  }

  if (socket && currentUserId !== userId) {
    console.log('[socket] userId changed from', currentUserId, 'to', userId, 'disconnecting old socket');
    socket.disconnect();
    socket = null;
  }

  const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
  connectionCount++;

  console.log('[socket] creating new socket', connectionCount, 'for userId:', userId);

  socket = io(socketUrl, {
    query: { userId },
    withCredentials: true,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000
  });

  currentUserId = userId;

  socket.on('connect', () => {
    console.log('[socket] connected', socket.id, 'userId:', userId);
  });

  socket.on('disconnect', (reason) => {
    console.log('[socket] disconnected', socket.id, 'reason:', reason, 'userId:', userId);
    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });

  socket.on('connect_error', (err) => {
    console.log('[socket] connect_error', err?.message || err);
  });

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    console.log('[socket] disconnecting socket for userId:', currentUserId);
    socket.disconnect();
    socket = null;
    currentUserId = null;
  }
};

export const getSocket = () => socket;
