import React, { useState, useRef, useEffect } from 'react';

const LazyLoader = ({ 
  children, 
  fallback = null, 
  threshold = 0.1, 
  rootMargin = '50px',
  className = '',
  style = {},
  onVisible = null
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasLoaded) {
          setIsVisible(true);
          setHasLoaded(true);
          // Call onVisible callback if provided
          if (onVisible) {
            onVisible();
          }
          // Disconnect observer after first load
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={elementRef} className={className} style={style}>
      {isVisible ? children : (fallback || <SkeletonLoader />)}
    </div>
  );
};

// Skeleton Loader Component
export const SkeletonLoader = ({ 
  type = 'card', 
  width = '100%', 
  height = '200px',
  className = ''
}) => {
  const getSkeletonClass = () => {
    switch (type) {
      case 'card':
        return 'bg-white border border-gray-200 rounded-lg overflow-hidden';
      case 'award-card':
        return 'bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200';
      case 'image':
        return 'bg-gray-200 rounded';
      case 'text':
        return 'bg-gray-200 rounded';
      case 'circle':
        return 'bg-gray-200 rounded-full';
      default:
        return 'bg-gray-200 rounded';
    }
  };

  return (
    <div className={`${getSkeletonClass()} ${className}`} style={{ width, height }}>
      <div className="animate-pulse">
        {type === 'card' && (
          <>
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-6">
              <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </div>
          </>
        )}
        {type === 'award-card' && (
          <>
            <div className="h-64 bg-gray-200 flex items-center justify-center relative">
              <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
              <div className="absolute top-3 right-3 w-12 h-6 bg-gray-300 rounded-full"></div>
            </div>
            <div className="p-6">
              <div className="h-5 bg-gray-200 rounded mb-3 w-4/5"></div>
              <div className="h-3 bg-gray-200 rounded mb-2 w-full"></div>
              <div className="h-3 bg-gray-200 rounded mb-2 w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded mb-4 w-2/3"></div>
              <div className="flex justify-between items-center">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </>
        )}
        {type === 'image' && (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        {type === 'text' && (
          <div className="w-full h-full bg-gray-200"></div>
        )}
        {type === 'circle' && (
          <div className="w-full h-full bg-gray-200"></div>
        )}
      </div>
    </div>
  );
};

// Enhanced Loading Spinner
export const LoadingSpinner = ({ 
  size = 'large', 
  text = 'Loading...', 
  showText = true,
  className = ''
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-6 h-6';
      case 'medium':
        return 'w-12 h-12';
      case 'large':
        return 'w-20 h-20';
      default:
        return 'w-20 h-20';
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <div className={`${getSizeClass()} border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin`}></div>
        <div className={`absolute inset-0 ${getSizeClass()} border-4 border-transparent border-t-blue-400 rounded-full animate-spin`} 
             style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
      </div>
      {showText && text && (
        <div className="mt-4 text-center">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">{text}</h3>
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Lazy Image Component
export const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onLoad = null,
  onError = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          {placeholder || <SkeletonLoader type="image" className="w-full h-full" />}
        </div>
      )}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-400">
          <div className="text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
            <p className="text-sm">Failed to load</p>
          </div>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyLoader;
