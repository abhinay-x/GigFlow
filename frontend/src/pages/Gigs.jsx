import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchGigs } from '../redux/slices/gigSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { Search, Plus } from 'lucide-react';

export default function Gigs() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('open');
  const { gigs, loading } = useSelector((state) => state.gigs);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchGigs({ search, status: statusFilter }));
  }, [dispatch, search, statusFilter]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4 animate-slide-up">
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Browse Gigs
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">Find your next project</p>
            </div>
            {isAuthenticated && (
              <Button onClick={() => navigate('/create-gig')} variant="gradient" className="w-full md:w-auto flex items-center justify-center gap-2">
                <Plus size={16} />
                Post Gig
              </Button>
            )}
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search gigs..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                />
              </div>
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="assigned">Assigned</option>
            </select>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Loading gigs...</p>
            </div>
          ) : gigs.length === 0 ? (
            <div className="text-center py-12 glass-effect rounded-2xl p-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Search className="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No gigs found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigs.map((gig, index) => (
                <Card key={gig._id} className="glass-effect hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer group animate-slide-up" style={{ animationDelay: `${0.2 + index * 0.05}s` }} onClick={() => navigate(`/gig/${gig._id}`)}>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{gig.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{gig.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {gig.budgetType && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300">
                        {gig.budgetType === 'hourly' ? 'Hourly' : 'Fixed'}
                      </span>
                    )}
                    {gig.deadline && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300">
                        Deadline: {new Date(gig.deadline).toLocaleDateString()}
                      </span>
                    )}
                    {Array.isArray(gig.skillsRequired) && gig.skillsRequired.slice(0, 3).map((s) => (
                      <span key={s} className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300">
                        {s}
                      </span>
                    ))}
                    {Array.isArray(gig.skillsRequired) && gig.skillsRequired.length > 3 && (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300">
                        +{gig.skillsRequired.length - 3}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                      ${gig.budget}
                      {gig.budgetType === 'hourly' ? '/hr' : ''}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      gig.status === 'open' ? 'bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300' : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300'
                    }`}>
                      {gig.status}
                    </span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Posted by {gig.ownerId?.name}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
