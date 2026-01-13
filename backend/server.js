import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import gigRoutes from './routes/gig.routes.js';
import bidRoutes from './routes/bid.routes.js';
import profileRoutes from './routes/profile.routes.js';
import conversationRoutes from './routes/conversation.routes.js';

/**
 * Backend entry point.
 *
 * Responsibilities:
 * - Configure Express middleware (JSON parsing, cookies).
 * - Configure CORS for both REST APIs and Socket.IO.
 * - Create a Socket.IO server and attach it to the HTTP server.
 * - Maintain a simple "room-per-user" model via the `join(userId)` event.
 *   Controllers/services emit real-time events with `io.to(userId).emit(...)`.
 *
 * Production notes:
 * - Cross-site auth uses HttpOnly cookies (see auth controller). CORS must allow
 *   the deployed frontend origin and set `credentials: true`.
 * - Vercel preview deployments use `*.vercel.app`; `isAllowedOrigin` permits
 *   these hostnames to avoid breaking preview builds.
 */

dotenv.config();

const allowedOrigins = [
  'http://localhost:5173',
  'https://gig-flow-xi.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  try {
    const { hostname } = new URL(origin);
    return hostname.endsWith('.vercel.app');
  } catch {
    return false;
  }
};

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  }
});

app.set('io', io);

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/bids', bidRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/conversations', conversationRoutes);

io.on('connection', (socket) => {
  console.log('[socket] connected:', socket.id);

  socket.on('join', (userId) => {
    if (userId) {
      socket.join(userId);
      console.log(`[socket] user joined room: ${userId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('[socket] disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    httpServer.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
