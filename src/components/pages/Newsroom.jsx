import React from 'react';
import CGPEHeader from '../headers/CGPEHeader';
import Footer from '../Footer';

const Newsroom = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CGPEHeader />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Newsroom</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and insights from C.G. Patel House of Insurance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample News Items */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-2">📰</div>
                <p className="text-sm font-medium">Insurance News</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                New Insurance Products Launch
              </h3>
              <p className="text-gray-600 mb-4">
                We're excited to announce our latest range of comprehensive insurance products designed to meet your evolving needs.
              </p>
              <div className="text-sm text-gray-500">
                <span>December 15, 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-2">🏆</div>
                <p className="text-sm font-medium">Awards & Recognition</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Industry Excellence Award 2024
              </h3>
              <p className="text-gray-600 mb-4">
                C.G. Patel House of Insurance has been recognized for outstanding service and customer satisfaction in the insurance industry.
              </p>
              <div className="text-sm text-gray-500">
                <span>December 10, 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-2">💡</div>
                <p className="text-sm font-medium">Industry Insights</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Future of Insurance Technology
              </h3>
              <p className="text-gray-600 mb-4">
                Exploring how emerging technologies are reshaping the insurance landscape and what it means for our clients.
              </p>
              <div className="text-sm text-gray-500">
                <span>December 5, 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-2">📈</div>
                <p className="text-sm font-medium">Market Updates</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Q4 2024 Market Analysis
              </h3>
              <p className="text-gray-600 mb-4">
                Our latest analysis of market trends and their impact on insurance premiums and coverage options.
              </p>
              <div className="text-sm text-gray-500">
                <span>November 28, 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-2">🎯</div>
                <p className="text-sm font-medium">Company News</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Expanding Our Services
              </h3>
              <p className="text-gray-600 mb-4">
                We're proud to announce the expansion of our services to better serve our growing client base across the region.
              </p>
              <div className="text-sm text-gray-500">
                <span>November 20, 2024</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-gradient-to-r from-teal-500 to-teal-600 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-2">🤝</div>
                <p className="text-sm font-medium">Partnerships</p>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Strategic Partnership Announcement
              </h3>
              <p className="text-gray-600 mb-4">
                We're excited to announce our new strategic partnership that will bring enhanced value to our clients.
              </p>
              <div className="text-sm text-gray-500">
                <span>November 15, 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Stay Updated</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest news, updates, and insights directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Newsroom;
