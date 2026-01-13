import { io } from 'socket.io-client';

/**
 * Socket.IO client singleton.
 *
 * - Uses `VITE_SOCKET_URL` in production to connect to the backend host.
 *   Example: `https://<render-service>.onrender.com`
 * - `autoConnect: false`: the app connects only after auth is confirmed.
 * - After connecting, the app emits `join(userId)` (see `App.jsx`) so the
 *   backend can deliver user-scoped events via `io.to(userId).emit(...)`.
 */

const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const socket = io(socketUrl, {
  withCredentials: true,
  autoConnect: false,
  transports: ['websocket', 'polling']
});
