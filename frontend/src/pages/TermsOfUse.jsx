import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function TermsOfUse() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/30">
      <Navbar />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass-effect rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Terms of Use
            </h1>
            <div className="text-gray-600 dark:text-gray-300 space-y-4 leading-relaxed">
              <p>
                These terms govern your access to and use of GigFlow.
              </p>
              <p>
                Replace this placeholder with your legal terms (accounts, acceptable use, payments, disputes, and termination).
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
