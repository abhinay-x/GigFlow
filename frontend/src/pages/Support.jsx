import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Support() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Support
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Need help? Reach out and we’ll get back to you as soon as possible.
            </p>

            <div className="mt-8 rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Contact</h2>
              <p className="text-gray-600 dark:text-gray-400">Email: contact@gigflow.com</p>
              <p className="text-gray-600 dark:text-gray-400">Twitter: https://twitter.com</p>
              <p className="text-gray-600 dark:text-gray-400">GitHub: https://github.com/abhinay-x</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
