import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for handling video loading with error handling and optimization
 * @param {string} src - Video source URL
 * @param {Object} options - Video options
 * @returns {Object} - Video element ref and loading state
 */
export const useVideoLoader = (src, options = {}) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
      setIsReady(false);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setIsReady(true);
      setHasError(false);
    };

    const handleError = (e) => {
      console.warn('Video loading error:', src, e);
      setIsLoading(false);
      setHasError(true);
      setIsReady(false);
    };

    const handleAbort = () => {
      console.warn('Video loading aborted:', src);
      setIsLoading(false);
      setHasError(true);
      setIsReady(false);
    };

    // Set up event listeners
    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    video.addEventListener('abort', handleAbort);

    // Set video attributes for optimal loading
    video.preload = options.preload || 'metadata';
    video.muted = options.muted !== false;
    video.playsInline = options.playsInline !== false;
    video.loop = options.loop || false;

    // Set the source
    video.src = src;

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
      video.removeEventListener('abort', handleAbort);
    };
  }, [src, options]);

  const play = async () => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    try {
      await video.play();
    } catch (error) {
      console.warn('Video play error:', error);
    }
  };

  const pause = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
  };

  return {
    videoRef,
    isLoading,
    hasError,
    isReady,
    play,
    pause
  };
};
