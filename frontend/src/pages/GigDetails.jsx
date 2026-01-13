import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { fetchGigById, clearSelectedGig } from '../redux/slices/gigSlice';
import { fetchBidsByGig, createBid, hireFreelancer } from '../redux/slices/bidSlice';
import { getOrCreateConversationByBid, fetchMessages, sendMessage, editMessage, deleteMessage } from '../redux/slices/conversationSlice';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Card from '../components/Card';
import toast from 'react-hot-toast';
import { ArrowLeft, MessageSquare } from 'lucide-react';
import ChatDrawer from '../components/ChatDrawer';

export default function GigDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { selectedGig, loading: gigLoading } = useSelector((state) => state.gigs);
  const { bids, loading: bidsLoading } = useSelector((state) => state.bids);
  const { activeConversation, messagesByConversationId, loading: conversationLoading } = useSelector((state) => state.conversations);
  
  const [bidMessage, setBidMessage] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [submittingBid, setSubmittingBid] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState('Messages');

  useEffect(() => {
    dispatch(fetchGigById(id));
    dispatch(fetchBidsByGig(id));

    return () => {
      dispatch(clearSelectedGig());
    };
  }, [dispatch, id]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const chatBidId = params.get('chatBidId');
    if (!chatBidId) return;
    if (!isAuthenticated) return;
    if (bidsLoading) return;

    const bid = bids.find((b) => b._id === chatBidId) || null;
    if (!bid) return;

    openChatForBid(bid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, bidsLoading, bids, isAuthenticated]);

  const isOwner = selectedGig && user && selectedGig.ownerId._id === user._id;
  const hasBid = bids.some(bid => bid.freelancerId._id === user?._id);
  const myBid = bids.find(bid => bid.freelancerId._id === user?._id) || null;

  const openChatForBid = async (bid) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const conversation = await dispatch(getOrCreateConversationByBid(bid._id)).unwrap();
      await dispatch(fetchMessages(conversation._id)).unwrap();
      setChatTitle(
        isOwner
          ? `${bid.freelancerId?.name || 'Freelancer'} • ${selectedGig?.title || ''}`
          : `${selectedGig?.ownerId?.name || 'Client'} • ${selectedGig?.title || ''}`
      );
      setChatOpen(true);
    } catch (err) {
      toast.error(err || 'Failed to open conversation');
    }
  };

  const handleSendChatMessage = async (text) => {
    if (!activeConversation?._id) return;
    try {
      await dispatch(sendMessage({ conversationId: activeConversation._id, text })).unwrap();
    } catch (err) {
      toast.error(err || 'Failed to send message');
    }
  };

  const handleEditChatMessage = async (messageId, text) => {
    try {
      await dispatch(editMessage({ messageId, text })).unwrap();
    } catch (err) {
      toast.error(err || 'Failed to edit message');
    }
  };

  const handleDeleteChatMessage = async (messageId) => {
    try {
      await dispatch(deleteMessage(messageId)).unwrap();
    } catch (err) {
      toast.error(err || 'Failed to delete message');
    }
  };

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    setSubmittingBid(true);

    try {
      await dispatch(createBid({ gigId: id, message: bidMessage, price: Number(bidPrice) })).unwrap();
      toast.success('Bid submitted successfully!');
      setBidMessage('');
      setBidPrice('');
      dispatch(fetchBidsByGig(id));
    } catch (err) {
      toast.error(err || 'Failed to submit bid');
    } finally {
      setSubmittingBid(false);
    }
  };

  const handleHire = async (bidId) => {
    try {
      await dispatch(hireFreelancer(bidId)).unwrap();
      toast.success('Freelancer hired successfully!');
      dispatch(fetchGigById(id));
      dispatch(fetchBidsByGig(id));
    } catch (err) {
      toast.error(err || 'Failed to hire freelancer');
    }
  };

  if (gigLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Loading gig...</p>
      </div>
    );
  }

  if (!selectedGig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Gig not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />
      <ChatDrawer
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        title={chatTitle}
        loading={conversationLoading}
        messages={activeConversation?._id ? (messagesByConversationId[activeConversation._id] || []) : []}
        currentUserId={user?._id}
        onSend={handleSendChatMessage}
        onEdit={handleEditChatMessage}
        onDelete={handleDeleteChatMessage}
      />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative max-w-5xl mx-auto">
          <button
            onClick={() => navigate('/gigs')}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Gigs
          </button>

          <Card className="mb-8 glass-effect animate-slide-up">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-3">
              <h1 className="text-3xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent break-words">{selectedGig.title}</h1>
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                selectedGig.status === 'open' ? 'bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300' : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300'
              }`}>
                {selectedGig.status}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg leading-relaxed">{selectedGig.description}</p>
            {(selectedGig.budgetType || selectedGig.deadline || (Array.isArray(selectedGig.skillsRequired) && selectedGig.skillsRequired.length > 0)) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedGig.budgetType && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300">
                    {selectedGig.budgetType === 'hourly' ? 'Hourly' : 'Fixed'}
                  </span>
                )}
                {selectedGig.deadline && (
                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300">
                    Deadline: {new Date(selectedGig.deadline).toLocaleDateString()}
                  </span>
                )}
                {Array.isArray(selectedGig.skillsRequired) && selectedGig.skillsRequired.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full text-sm font-semibold bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 text-primary-700 dark:text-primary-300">
                    {s}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Posted by</p>
                <p className="font-bold text-gray-900 dark:text-white text-lg">{selectedGig.ownerId.name}</p>
              </div>
              <div className="sm:text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Budget</p>
                <p className="text-3xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  ${selectedGig.budget}
                  {selectedGig.budgetType === 'hourly' ? '/hr' : ''}
                </p>
              </div>
            </div>
          </Card>

          {isOwner ? (
            <Card className="glass-effect animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Bids ({bids.length})</h2>
              {bidsLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-primary-600"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading bids...</p>
                </div>
              ) : bids.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="mx-auto w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No bids yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bids.map((bid) => (
                    <div key={bid._id} className="glass-effect rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300 hover:shadow-xl">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{bid.freelancerId.name}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{bid.freelancerId.email}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">${bid.price}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            bid.status === 'hired' ? 'bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300' :
                            bid.status === 'rejected' ? 'bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-700 dark:text-red-300' :
                            'bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 text-yellow-700 dark:text-yellow-300'
                          }`}>
                            {bid.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-wrap leading-relaxed">{bid.message}</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="secondary"
                          className="w-full flex items-center justify-center gap-2"
                          onClick={() => openChatForBid(bid)}
                        >
                          <MessageSquare size={16} />
                          Message
                        </Button>
                        {selectedGig.status === 'open' && bid.status === 'pending' && (
                          <Button
                            variant="gradient"
                            onClick={() => handleHire(bid._id)}
                            className="w-full"
                          >
                            Hire This Freelancer
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ) : !isAuthenticated ? (
            <Card className="glass-effect animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400 mb-6">Please log in to submit a bid</p>
                <Button onClick={() => navigate('/login')} variant="gradient" className="w-full">Login to Bid</Button>
              </div>
            </Card>
          ) : (
            <Card className="glass-effect animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {myBid ? (
                <div className="text-center py-8 space-y-6">
                  <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Your bid status: <span className={`font-bold px-3 py-1 rounded-full ${
                      myBid.status === 'hired' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                      myBid.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                      'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>{myBid.status}</span>
                  </p>
                  <Button
                    variant="gradient"
                    className="inline-flex items-center gap-2"
                    onClick={() => openChatForBid(myBid)}
                  >
                    <MessageSquare size={16} />
                    Message Client
                  </Button>
                </div>
              ) : selectedGig.status === 'open' ? (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Submit a Bid</h2>
                  <form onSubmit={handleBidSubmit} className="space-y-6">
                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Your Proposal <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={bidMessage}
                        onChange={(e) => setBidMessage(e.target.value)}
                        placeholder="Explain why you're the best fit for this project..."
                        required
                        rows={4}
                        className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500 resize-none"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Your Price ($) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                        placeholder="Your bid amount"
                        min="1"
                        required
                        className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={submittingBid}
                      variant="gradient"
                      size="lg"
                      className="w-full"
                    >
                      {submittingBid ? 'Submitting...' : 'Submit Bid'}
                    </Button>
                  </form>
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400">This gig is no longer accepting bids</p>
                </div>
              )}
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
