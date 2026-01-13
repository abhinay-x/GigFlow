import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Bell, User, Info, Briefcase, Menu, X, LogOut, LayoutDashboard, ChevronDown } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import NotificationPanel from './NotificationPanel';
import { logout } from '../redux/slices/authSlice';
import { markAllRead } from '../redux/slices/notificationSlice';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const desktopNotificationsRef = useRef(null);
  const mobileNotificationsRef = useRef(null);
  const mobileMenuButtonRef = useRef(null);
  const mobileMenuPanelRef = useRef(null);
  const { unreadCount } = useSelector((state) => state.notifications);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }

      if (
        (desktopNotificationsRef.current && desktopNotificationsRef.current.contains(event.target)) ||
        (mobileNotificationsRef.current && mobileNotificationsRef.current.contains(event.target))
      ) {
        return;
      }

      setShowNotifications(false);

      const clickedMobileMenuButton = mobileMenuButtonRef.current && mobileMenuButtonRef.current.contains(event.target);
      const clickedMobileMenuPanel = mobileMenuPanelRef.current && mobileMenuPanelRef.current.contains(event.target);
      if (!clickedMobileMenuButton && !clickedMobileMenuPanel) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    setMobileMenuOpen(false);
    setProfileMenuOpen(false);
  };

  return (
    <nav className="glass-effect shadow-lg sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent hover:from-primary-500 hover:to-purple-500 transition-all duration-300">
            GigFlow
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/about"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
            >
              <Info className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
              <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">About</span>
            </Link>
            <Link
              to="/gigs"
              className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
            >
              <Briefcase className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
              <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Browse Gigs</span>
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
                >
                  <LayoutDashboard className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Dashboard</span>
                </Link>
                <div className="relative" ref={desktopNotificationsRef}>
                  <button
                    onClick={() => {
                      const next = !showNotifications;
                      setShowNotifications(next);
                      if (next) dispatch(markAllRead());
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group relative"
                  >
                    <Bell className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
                </div>
                <div className="relative" ref={profileMenuRef}>
                  <button
                    onClick={() => setProfileMenuOpen((open) => !open)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
                    aria-haspopup="menu"
                    aria-expanded={profileMenuOpen}
                  >
                    <User className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
                    <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {user?.name || 'Profile'}
                    </span>
                    <ChevronDown className={`text-gray-700 dark:text-gray-300 transition-transform duration-300 ${profileMenuOpen ? 'rotate-180' : ''} group-hover:text-primary-600 dark:group-hover:text-primary-400`} size={18} />
                  </button>

                  {profileMenuOpen && (
                    <div
                      className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl glass-effect overflow-hidden animate-scale-in"
                      role="menu"
                    >
                      <Link
                        to="/profile"
                        onClick={() => setProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
                        role="menuitem"
                      >
                        <User className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Profile Settings</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 transition-all duration-300 w-full text-left group"
                        role="menuitem"
                      >
                        <LogOut className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all duration-300" size={18} />
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
            <DarkModeToggle />
          </div>

          <div className="lg:hidden flex items-center space-x-2">
            {isAuthenticated && (
              <div className="relative" ref={mobileNotificationsRef}>
                <button
                  onClick={() => {
                    const next = !showNotifications;
                    setShowNotifications(next);
                    if (next) dispatch(markAllRead());
                  }}
                  className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group relative"
                >
                  <Bell className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow-lg">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
              </div>
            )}
            <DarkModeToggle />
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
            >
              {mobileMenuOpen ? (
                <X className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={24} />
              ) : (
                <Menu className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div ref={mobileMenuPanelRef} className="lg:hidden border-t border-gray-200/50 dark:border-gray-700/50 glass-effect animate-slide-up">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/about"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Info className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
              <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">About</span>
            </Link>
            <Link
              to="/gigs"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Briefcase className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
              <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Browse Gigs</span>
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LayoutDashboard className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Dashboard</span>
                </Link>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Profile</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 dark:hover:from-red-900/20 dark:hover:to-pink-900/20 transition-all duration-300 w-full text-left group"
                >
                  <LogOut className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all duration-300" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-purple-50 dark:hover:from-primary-900/20 dark:hover:to-purple-900/20 transition-all duration-300 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="text-gray-700 dark:text-gray-300 group-hover:scale-110 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300" size={20} />
                  <span className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Login</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
