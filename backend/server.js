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

dotenv.config();

const allowedOrigins = [
  'http://localhost:5173',
  'https://gig-flow-xi.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    credentials: true
  }
});

app.set('io', io);

app.use(cors({
  origin: allowedOrigins,
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
