import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { clearNotifications, markAllRead, markRead } from '../redux/slices/notificationSlice';

export default function NotificationPanel({ isOpen, onClose }) {
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  return (
    <div className="fixed left-4 right-4 md:left-auto md:right-4 top-20 w-auto md:w-80 max-w-[calc(100vw-2rem)] glass-effect rounded-2xl shadow-2xl z-50 animate-scale-in border border-gray-200/50 dark:border-gray-700/50">
      <div className="p-5 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-gray-900 dark:text-white">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-bold animate-pulse">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <Link
            to="/notifications"
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
            onClick={onClose}
          >
            View all
          </Link>
          <div className="flex gap-2">
            <button
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors"
              onClick={() => dispatch(markAllRead())}
              type="button"
            >
              Mark all read
            </button>
            <button
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
              onClick={() => dispatch(clearNotifications())}
              type="button"
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-10 text-center">
            <Bell className="mx-auto mb-3 text-gray-300 dark:text-gray-600" size={48} />
            <p className="text-gray-500 dark:text-gray-400 font-medium">No notifications</p>
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={notification.id || index}
              className={`p-4 border-b border-gray-200/50 dark:border-gray-700/50 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-purple-50/50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 cursor-pointer transition-all duration-300 ${notification.read ? 'opacity-70' : ''}`}
              onClick={() => {
                if (notification.id) dispatch(markRead(notification.id));
                onClose();
              }}
            >
              <div className="flex items-start gap-3">
                <div className={`w-2.5 h-2.5 rounded-full mt-2 flex-shrink-0 ${
                  notification.read ? 'bg-gray-300 dark:bg-gray-600' : (notification.type === 'hired' ? 'bg-gradient-to-r from-green-400 to-green-500 animate-pulse' : 'bg-gradient-to-r from-blue-400 to-blue-500 animate-pulse')
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900 dark:text-white leading-relaxed">{notification.message}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    {notification.createdAt ? new Date(notification.createdAt).toLocaleString() : new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
