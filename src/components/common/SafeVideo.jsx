import React, { useState, useRef } from 'react';

/**
 * Safe video component with error handling and fallback
 */
const SafeVideo = ({ 
  src, 
  className = '', 
  alt = '', 
  fallbackSrc = null,
  onError = null,
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const handleError = (e) => {
    console.warn('Video loading error:', src, e);
    setHasError(true);
    setIsLoading(false);
    if (onError) onError(e);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleAbort = () => {
    console.warn('Video loading aborted:', src);
    setHasError(true);
    setIsLoading(false);
  };

  // If there's an error and no fallback, show a placeholder
  if (hasError && !fallbackSrc) {
    return (
      <div 
        className={`${className} bg-gray-200 flex items-center justify-center`}
        style={{ minHeight: '200px' }}
      >
        <div className="text-gray-500 text-center">
          <div className="text-4xl mb-2">🎥</div>
          <div className="text-sm">Video unavailable</div>
        </div>
      </div>
    );
  }

  // If there's an error and we have a fallback, try the fallback
  if (hasError && fallbackSrc) {
    return (
      <SafeVideo
        src={fallbackSrc}
        className={className}
        alt={alt}
        onError={onError}
        {...props}
      />
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}
      <video
        ref={videoRef}
        src={src}
        className={className}
        alt={alt}
        onError={handleError}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onAbort={handleAbort}
        preload="metadata"
        muted
        playsInline
        {...props}
      />
    </div>
  );
};

export default SafeVideo;
