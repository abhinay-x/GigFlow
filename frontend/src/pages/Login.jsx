import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../redux/slices/authSlice';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import Input from '../components/Input';
import FeaturesSection from '../components/FeaturesSection';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) dispatch(clearError());

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      toast.success('Login successful!');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      toast.error(err || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />
      
      <main className="flex-grow relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        
        <div className="relative py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full mx-auto animate-slide-up">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-3">
                Welcome Back
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">Sign in to your GigFlow account</p>
            </div>
            
            <div className="glass-effect rounded-2xl shadow-2xl p-8 transform hover:scale-[1.01] transition-all duration-300">
              <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              
              <Button
                type="submit"
                disabled={loading}
                variant="gradient"
                size="lg"
                className="w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <FeaturesSection />
      </main>

      <Footer />
    </div>
  );
}
