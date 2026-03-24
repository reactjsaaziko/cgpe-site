import React from 'react';
import LazyLoader, { SkeletonLoader, LoadingSpinner, LazyImage } from '../common/LazyLoader';

const LazyLoaderDemo = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Lazy Loader Demo
        </h1>

        {/* Loading Spinner Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Loading Spinners</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Small</h3>
              <LoadingSpinner size="small" text="Small loader" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Medium</h3>
              <LoadingSpinner size="medium" text="Medium loader" />
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Large</h3>
              <LoadingSpinner size="large" text="Large loader" />
            </div>
          </div>
        </section>

        {/* Skeleton Loader Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Skeleton Loaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Card Skeleton</h3>
              <SkeletonLoader type="card" height="300px" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Image Skeleton</h3>
              <SkeletonLoader type="image" height="200px" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Text Skeleton</h3>
              <SkeletonLoader type="text" height="100px" />
            </div>
          </div>
        </section>

        {/* Lazy Image Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lazy Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <LazyImage
              src="https://picsum.photos/400/300?random=1"
              alt="Random image 1"
              className="w-full h-64 object-cover rounded-lg"
              placeholder={
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p>Loading image...</p>
                  </div>
                </div>
              }
            />
            <LazyImage
              src="https://picsum.photos/400/300?random=2"
              alt="Random image 2"
              className="w-full h-64 object-cover rounded-lg"
              placeholder={
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    <p>Loading image...</p>
                  </div>
                </div>
              }
            />
          </div>
        </section>

        {/* Lazy Content Demo */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Lazy Content Loading</h2>
          <div className="space-y-6">
            {Array.from({ length: 5 }, (_, i) => (
              <LazyLoader
                key={i}
                threshold={0.1}
                rootMargin="50px"
                fallback={
                  <SkeletonLoader 
                    type="card" 
                    height="150px"
                    className="mb-4"
                  />
                }
              >
                <div 
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    Lazy Loaded Content {i + 1}
                  </h3>
                  <p className="text-gray-600">
                    This content is loaded lazily as you scroll down. Each item appears with a 
                    staggered animation for a smooth user experience.
                  </p>
                  <div className="mt-4 flex items-center text-sm text-gray-500">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      Loaded on scroll
                    </span>
                  </div>
                </div>
              </LazyLoader>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LazyLoaderDemo;
