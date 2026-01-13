import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 text-gray-900 dark:text-white py-16 mt-auto">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="glass-effect rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up">
            <h3 className="text-3xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-4">
              GigFlow
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-4">
              Where Talent Meets Opportunity. The modern freelance marketplace.
            </p>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" fill="currentColor" />
              <span>for freelancers</span>
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100">Quick Links</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/about" className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About
                </Link>
              </li>
              <li>
                <Link to="/gigs" className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Browse Gigs
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div className="glass-effect rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100">Resources</h4>
            <ul className="space-y-3 text-gray-600 dark:text-gray-400">
              <li>
                <Link to="/docs" className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/faq" className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/support" className="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 hover:translate-x-1 transition-all duration-300 group">
                  <span className="w-1.5 h-1.5 bg-primary-600 dark:bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="glass-effect rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-bold text-xl mb-4 text-gray-900 dark:text-gray-100">Connect</h4>
            <div className="flex space-x-4 text-gray-600 dark:text-gray-400">
              <a href="mailto:r.abhinaychary@gmail.com" className="p-3 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 transition-all duration-300 group">
                <Mail size={20} className="group-hover:rotate-6 transition-transform" />
              </a>
              <a href="https://www.linkedin.com/in/abhinay-chary" className="p-3 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 transition-all duration-300 group">
                <Linkedin size={20} className="group-hover:rotate-6 transition-transform" />
              </a>
              <a href="https://github.com/abhinay-x" className="p-3 rounded-xl bg-gray-200/50 dark:bg-gray-800/50 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 hover:scale-110 transition-all duration-300 group">
                <Github size={20} className="group-hover:rotate-6 transition-transform" />
              </a>
            </div>
            <div className="mt-6">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Stay updated</p>
              <div className="flex w-full gap-2 min-w-0">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="min-w-0 flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:outline-none focus:border-primary-500 dark:focus:border-primary-400 transition-all"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-500 dark:to-purple-500 rounded-xl hover:from-primary-700 hover:to-purple-700 dark:hover:from-primary-600 dark:hover:to-purple-600 transition-all duration-300 font-semibold text-sm text-white flex-shrink-0">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300/50 dark:border-gray-700/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-400 text-base">
              &copy; 2024 GigFlow. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm">
              <Link to="/privacy" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Use</Link>
              <Link to="/cookies" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>

        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-primary-600 to-purple-600 dark:from-primary-500 dark:to-purple-500 text-white rounded-full shadow-2xl hover:shadow-primary-500/50 hover:scale-110 transition-all duration-300 z-40 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
