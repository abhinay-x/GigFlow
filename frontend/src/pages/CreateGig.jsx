import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGig } from '../redux/slices/gigSlice';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';

export default function CreateGig() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budgetType, setBudgetType] = useState('fixed');
  const [budget, setBudget] = useState('');
  const [skillsRequired, setSkillsRequired] = useState('');
  const [deadline, setDeadline] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.gigs);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillsArray = skillsRequired
      ? skillsRequired.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    try {
      await dispatch(createGig({
        title,
        description,
        budgetType,
        budget: Number(budget),
        skillsRequired: skillsArray,
        deadline: deadline || null
      })).unwrap();
      toast.success('Gig created successfully!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err || 'Failed to create gig');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />
      
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="mb-10 animate-slide-up">
            <h1 className="text-4xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Post a New Gig
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">Fill in the details to create your gig</p>
          </div>
          
          <div className="glass-effect rounded-2xl shadow-2xl p-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Website Redesign"
                required
              />

              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Budget Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={budgetType}
                  onChange={(e) => setBudgetType(e.target.value)}
                  className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500"
                  required
                >
                  <option value="fixed">Fixed Price</option>
                  <option value="hourly">Hourly</option>
                </select>
              </div>
              
              <div className="flex flex-col">
                <label className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your project in detail..."
                  required
                  rows={6}
                  className="px-4 py-3 border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 outline-none transition-all duration-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 hover:border-gray-300 dark:hover:border-gray-500 resize-none"
                />
              </div>
              
              <Input
                label="Budget ($)"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="500"
                min="1"
                required
              />

              <Input
                label="Skills / Tags (comma separated)"
                type="text"
                value={skillsRequired}
                onChange={(e) => setSkillsRequired(e.target.value)}
                placeholder="e.g., React, Node.js, UI/UX"
              />

              <Input
                label="Deadline"
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
              
              <Button
                type="submit"
                disabled={loading}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {loading ? 'Creating...' : 'Post Gig'}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
