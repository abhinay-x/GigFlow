import { Briefcase, DollarSign, Shield, Clock, MessageSquare, Award } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Post Jobs",
      description: "Easily create and manage your job postings to find the perfect talent.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Bid on Projects",
      description: "Browse available gigs and submit competitive bids to win projects.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Hire Securely",
      description: "Safe and secure hiring process with real-time notifications.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Get instant notifications on bids, hires, and project updates.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Easy Communication",
      description: "Seamlessly communicate with clients and freelancers.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Build Reputation",
      description: "Earn ratings and reviews to build your professional profile.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoNTksMTMwLDI0NiwwLjAzKSIvPjwvc3ZnPg==')] opacity-50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Why Choose GigFlow?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to succeed in the freelance marketplace
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-effect rounded-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`bg-gradient-to-br ${feature.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
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
  );
}
