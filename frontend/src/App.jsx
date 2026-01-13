import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getMe } from './redux/slices/authSlice';
import { addNotification } from './redux/slices/notificationSlice';
import { addIncomingMessage, updateIncomingMessage, removeIncomingMessage } from './redux/slices/conversationSlice';
import { socket } from './socket.js';
import toast from 'react-hot-toast';
import Landing from './pages/Landing';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Gigs from './pages/Gigs';
import CreateGig from './pages/CreateGig';
import GigDetails from './pages/GigDetails';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';
import Documentation from './pages/Documentation';
import FAQ from './pages/FAQ';
import Support from './pages/Support';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import CookiePolicy from './pages/CookiePolicy';
import { Toaster } from 'react-hot-toast';

/**
 * App router + global side effects.
 *
 * Socket lifecycle:
 * - After `getMe()` confirms authentication, connect Socket.IO.
 * - Emit `join(userId)` to subscribe the user to a private room.
 * - Listen for `hired`, `notification`, and messaging events.
 * - On logout/unmount, remove listeners and disconnect.
 *
 * Notification handling:
 * - `hired` event: display success toast and add notification.
 * - `notification` event: display success toast and add notification.
 * - `message:new` event: add incoming message, display success toast, and add notification if not sent by current user.
 * - `message:updated` event: update incoming message.
 * - `message:deleted` event: remove incoming message.
 */

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

function App() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, initialized } = useSelector((state) => state.auth);
  const userId = user?._id || user?.id;

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      socket.connect();
      socket.emit('join', userId);
      console.log('[socket] connected and joined room:', userId);

      socket.on('hired', (data) => {
        console.log('[socket] received hired event:', data);
        toast.success(data.message);
        dispatch(addNotification({
          type: 'hired',
          message: data.message,
          gig: data.gig
        }));
      });

      socket.on('notification', (data) => {
        console.log('[socket] received notification:', data);
        dispatch(addNotification(data));
        toast.success(data.message);
      });

      socket.on('message:new', (data) => {
        console.log('[socket] received message:new', data);
        if (data?.conversationId && data?.message) {
          dispatch(addIncomingMessage({
            conversationId: data.conversationId,
            message: data.message
          }));

          const senderId = data.message?.senderId?._id || data.message?.senderId;
          const isMyMessage = senderId === userId;

          console.log('[socket] message:new senderId:', senderId, 'current userId:', userId, 'isMyMessage:', isMyMessage);

          if (!isMyMessage) {
            const senderName = data.message?.senderId?.name || 'New message';
            const preview = typeof data.message?.text === 'string' ? data.message.text : '';
            dispatch(addNotification({
              type: 'message',
              message: `${senderName}: ${preview.length > 60 ? `${preview.slice(0, 60)}...` : preview}`,
              conversationId: data.conversationId,
              senderId: data.message?.senderId
            }));
            toast.success(`${senderName}: ${preview.length > 60 ? `${preview.slice(0, 60)}...` : preview}`);
          }
        }
      });

      socket.on('message:updated', (data) => {
        if (data?.conversationId && data?.message) {
          dispatch(updateIncomingMessage({
            conversationId: data.conversationId,
            message: data.message
          }));
        }
      });

      socket.on('message:deleted', (data) => {
        if (data?.conversationId && data?.messageId) {
          dispatch(removeIncomingMessage({
            conversationId: data.conversationId,
            messageId: data.messageId
          }));
        }
      });

      return () => {
        socket.off('hired');
        socket.off('notification');
        socket.off('message:new');
        socket.off('message:updated');
        socket.off('message:deleted');
        socket.disconnect();
        console.log('[socket] disconnected');
      };
    }
  }, [isAuthenticated, userId, dispatch]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      {!initialized ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading...</p>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfUse />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/gigs" element={<Gigs />} />
          <Route path="/gig/:id" element={<GigDetails />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-gig"
            element={
              <ProtectedRoute>
                <CreateGig />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
