import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../redux/slices/authSlice';
import { fetchMyGigs } from '../redux/slices/gigSlice';
import { fetchMyBids, withdrawBid } from '../redux/slices/bidSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import { Plus, FileText, Send, Briefcase, DollarSign, TrendingUp, X, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { myGigs } = useSelector((state) => state.gigs);
  const { myBids } = useSelector((state) => state.bids);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(getMe());
    dispatch(fetchMyGigs());
    dispatch(fetchMyBids());
  }, [isAuthenticated, navigate, dispatch]);

  const handleWithdraw = async (bidId, gigTitle) => {
    if (window.confirm(`Are you sure you want to withdraw your bid for "${gigTitle}"?`)) {
      try {
        await dispatch(withdrawBid(bidId)).unwrap();
        toast.success('Bid withdrawn successfully');
      } catch (err) {
        toast.error(err || 'Failed to withdraw bid');
      }
    }
  };

  const openChatForOwnerGig = (gig) => {
    const assignedBidId = gig?.assignedBidId?._id || gig?.assignedBidId;
    if (!assignedBidId) {
      navigate(`/gig/${gig._id}`);
      return;
    }
    navigate(`/gig/${gig._id}?chatBidId=${assignedBidId}`);
  };

  const openChatForMyBid = (bid) => {
    if (!bid?._id || !bid?.gigId?._id) return;
    navigate(`/gig/${bid.gigId._id}?chatBidId=${bid._id}`);
  };

  if (!isAuthenticated) return null;

  const totalGigs = myGigs.length;
  const totalBids = myBids.length;
  const hiredBids = myBids.filter(bid => bid.status === 'hired').length;
  const totalBudget = myGigs.reduce((sum, gig) => sum + gig.budget, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="mb-10 animate-slide-up">
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Manage your gigs and bids</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <Card className="glass-effect bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Gigs</p>
                  <p className="text-4xl font-black mt-1">{totalGigs}</p>
                </div>
                <Briefcase size={48} className="text-blue-200" />
              </div>
            </Card>

            <Card className="glass-effect bg-gradient-to-br from-green-500 to-emerald-600 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Total Bids</p>
                  <p className="text-4xl font-black mt-1">{totalBids}</p>
                </div>
                <Send size={48} className="text-green-200" />
              </div>
            </Card>

            <Card className="glass-effect bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Projects Won</p>
                  <p className="text-4xl font-black mt-1">{hiredBids}</p>
                </div>
                <TrendingUp size={48} className="text-purple-200" />
              </div>
            </Card>

            <Card className="glass-effect bg-gradient-to-br from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm font-medium">Total Budget</p>
                  <p className="text-4xl font-black mt-1">${totalBudget}</p>
                </div>
                <DollarSign size={48} className="text-orange-200" />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="glass-effect animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Posted Gigs</h2>
                <Button onClick={() => navigate('/create-gig')} variant="gradient" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  <Plus size={16} />
                  Post Gig
                </Button>
              </div>
              {myGigs.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No gigs posted yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myGigs.map((gig) => (
                    <div key={gig._id} className="glass-effect rounded-xl p-5 hover:scale-[1.02] cursor-pointer transition-all duration-300 hover:shadow-lg group" onClick={() => navigate(`/gig/${gig._id}`)}>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{gig.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                        <DollarSign size={14} className="text-green-500" />
                        ${gig.budget} • <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          gig.status === 'assigned' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                        }`}>{gig.status}</span>
                      </p>
                      {gig.status === 'assigned' && gig.assignedBidId && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mt-4 flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            openChatForOwnerGig(gig);
                          }}
                        >
                          <MessageSquare size={14} />
                          Chat
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card className="glass-effect animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">My Bids</h2>
                <Button onClick={() => navigate('/gigs')} variant="gradient" className="w-full sm:w-auto flex items-center justify-center gap-2">
                  <Send size={16} />
                  Browse Gigs
                </Button>
              </div>
              {myBids.length === 0 ? (
                <div className="text-center py-12">
                  <Send className="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No bids submitted yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {myBids.map((bid) => (
                    <div key={bid._id} className="glass-effect rounded-xl p-5 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg">
                      <div 
                        className="cursor-pointer"
                        onClick={() => navigate(`/gig/${bid.gigId._id}`)}
                      >
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{bid.gigId?.title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 flex items-center gap-2">
                          <DollarSign size={14} className="text-green-500" />
                          Bid: ${bid.price} • <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            bid.status === 'hired' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            bid.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                            'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          }`}>{bid.status}</span>
                        </p>
                      </div>
                      {bid.status === 'hired' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          className="mt-4 flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            openChatForMyBid(bid);
                          }}
                        >
                          <MessageSquare size={14} />
                          Chat
                        </Button>
                      )}
                      {bid.status === 'pending' && (
                        <Button
                          variant="danger"
                          size="sm"
                          className="mt-4 flex items-center gap-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWithdraw(bid._id, bid.gigId?.title);
                          }}
                        >
                          <X size={14} />
                          Withdraw Bid
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
