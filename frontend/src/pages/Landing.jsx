import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import FeaturesSection from '../components/FeaturesSection';
import { ArrowRight, Sparkles, Zap, Users, TrendingUp, CheckCircle, Star, Play } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/10 via-purple-600/10 to-pink-600/10 dark:from-primary-900/20 dark:via-purple-900/20 dark:to-pink-900/20"></div>
          
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-float-slow"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                <span>The Future of Freelancing</span>
              </div>
              
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-6 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-x">
                GigFlow
              </h1>
              
              <p className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
                Where Talent Meets Opportunity
              </p>
              
              <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-relaxed">
                The modern freelance marketplace that connects talented freelancers with businesses looking for quality work.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
                <Link to="/login">
                  <Button variant="secondary" size="lg">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="gradient" size="lg">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/gigs">
                  <Button variant="outline" size="lg">
                    Browse Gigs
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">No Credit Card Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Instant Setup</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium">Secure Platform</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
        </section>

        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
                Why Freelancers Love GigFlow
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Join thousands of successful freelancers
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Lightning Fast",
                  description: "Find and apply to gigs in seconds with our streamlined platform"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Quality Clients",
                  description: "Connect with verified businesses ready to hire"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "Grow Your Income",
                  description: "Build your reputation and increase your earning potential"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-xl animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-gradient-to-br from-primary-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturesSection />

        <section className="py-20 bg-gradient-to-br from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-30"></div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="animate-slide-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of freelancers and clients already using GigFlow to transform their work.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/register">
                  <Button variant="secondary" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    Create Free Account
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/gigs">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-600">
                    <Play className="w-5 h-5 mr-2" />
                    See How It Works
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-8 text-white/80">
                <div className="text-center">
                  <div className="text-4xl font-bold">10K+</div>
                  <div className="text-sm">Active Freelancers</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="text-4xl font-bold">5K+</div>
                  <div className="text-sm">Projects Completed</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-white/30"></div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-4xl font-bold">4.9</span>
                  </div>
                  <div className="text-sm">User Rating</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
