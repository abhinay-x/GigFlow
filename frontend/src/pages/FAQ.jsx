import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
              FAQ
            </h1>

            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Is GigFlow free to use?</h2>
                <p className="text-gray-600 dark:text-gray-400">You can browse and create an account for free.</p>
              </div>
              <div className="rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How do I apply to a gig?</h2>
                <p className="text-gray-600 dark:text-gray-400">Open a gig and submit your proposal with relevant details.</p>
              </div>
              <div className="rounded-2xl border border-gray-200/60 dark:border-gray-700/60 p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">How do notifications work?</h2>
                <p className="text-gray-600 dark:text-gray-400">We send in-app notifications for important events and updates.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
