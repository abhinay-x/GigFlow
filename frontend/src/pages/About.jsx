import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Target, Users, Zap, Shield, Heart, ArrowRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />
      
      <main className="flex-grow relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '0.5s' }}></div>
        
        <div className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-slide-up">
              <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
                About GigFlow
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                Where Talent Meets Opportunity. We're revolutionizing the way freelancers and clients connect.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
              <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Target size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Mission</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  To bridge the gap between talented freelancers and businesses seeking exceptional work, creating meaningful connections that drive success.
                </p>
              </div>

              <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Users size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Our Community</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Join thousands of freelancers and clients who trust GigFlow to find the perfect match for their projects and career goals.
                </p>
              </div>

              <div className="glass-effect rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Zap size={32} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Fast & Easy</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  Our streamlined platform makes it simple to post gigs, submit bids, and collaborate on projects with ease.
                </p>
              </div>
            </div>

            <div className="glass-effect rounded-3xl p-12 mb-20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
                    Why Choose GigFlow?
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                    We've built GigFlow with both freelancers and clients in mind. Our platform offers transparency, security, and tools that help you succeed.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">Secure Payments</h4>
                        <p className="text-gray-600 dark:text-gray-400">Protected transactions for both parties</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Heart size={20} className="text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">Quality Matches</h4>
                        <p className="text-gray-600 dark:text-gray-400">Smart algorithms connect the right talent</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
                  <div className="relative glass-effect rounded-2xl p-8 text-center">
                    <div className="text-5xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      10K+
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Active Users</p>
                    <div className="text-5xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      5K+
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">Projects Completed</p>
                    <div className="text-5xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-2">
                      98%
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">Satisfaction Rate</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of freelancers and clients already using GigFlow to achieve their goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="gradient" size="lg" className="flex items-center gap-2">
                  Find Gigs
                  <ArrowRight size={18} />
                </Button>
                <Button variant="secondary" size="lg" className="flex items-center gap-2">
                  Post a Gig
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
