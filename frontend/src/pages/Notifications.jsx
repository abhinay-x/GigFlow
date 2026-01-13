import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import { Bell } from 'lucide-react';
import { clearNotifications, markAllRead, markRead } from '../redux/slices/notificationSlice';

export default function Notifications() {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);

  useEffect(() => {
    if (unreadCount > 0) dispatch(markAllRead());
  }, [dispatch, unreadCount]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4 animate-slide-up">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Notifications
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Your notifications stay here until you clear them.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button variant="secondary" onClick={() => dispatch(markAllRead())} className="w-full sm:w-auto">
                Mark all read
              </Button>
              <Button variant="danger" onClick={() => dispatch(clearNotifications())} className="w-full sm:w-auto">
                Clear all
              </Button>
            </div>
          </div>

          <Card className="glass-effect animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {notifications.length === 0 ? (
              <div className="py-16 text-center">
                <Bell className="mx-auto mb-4 text-gray-300 dark:text-gray-600" size={64} />
                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
                {notifications.map((n, idx) => (
                  <button
                    key={n.id || idx}
                    type="button"
                    className="w-full text-left p-5 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-purple-50/50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
                    onClick={() => {
                      if (n.id) dispatch(markRead(n.id));
                    }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${
                          n.read ? 'bg-gray-300 dark:bg-gray-600' : n.type === 'hired' ? 'bg-gradient-to-r from-green-400 to-green-500 animate-pulse' : 'bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse'
                        }`}
                      />
                      <div className="flex-1">
                        <p className={`text-base leading-relaxed ${n.read ? 'text-gray-700 dark:text-gray-300' : 'text-gray-900 dark:text-white font-semibold'}`}>
                          {n.message}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {n.createdAt ? new Date(n.createdAt).toLocaleString() : ''}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
