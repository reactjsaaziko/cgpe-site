import { useState, useEffect } from 'react';

/**
 * Custom hook for preloading images
 * @param {Array} imageUrls - Array of image URLs to preload
 * @param {Object} options - Preloading options
 * @returns {Object} - Loading state and progress
 */
export const useImagePreloader = (imageUrls = [], options = {}) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [failedImages, setFailedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const { 
    onComplete, 
    onProgress, 
    onError,
    priority = false 
  } = options;

  useEffect(() => {
    if (!imageUrls.length) return;

    setIsLoading(true);
    setProgress(0);
    setLoadedImages(new Set());
    setFailedImages(new Set());

    let completedCount = 0;
    const totalImages = imageUrls.length;

    const loadImage = (url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          completedCount++;
          setLoadedImages(prev => new Set([...prev, url]));
          setProgress((completedCount / totalImages) * 100);
          
          if (onProgress) {
            onProgress(completedCount, totalImages, url);
          }
          
          if (completedCount === totalImages) {
            setIsLoading(false);
            if (onComplete) onComplete();
          }
          
          resolve(url);
        };
        
        img.onerror = () => {
          completedCount++;
          setFailedImages(prev => new Set([...prev, url]));
          setProgress((completedCount / totalImages) * 100);
          
          if (onError) onError(url);
          
          if (completedCount === totalImages) {
            setIsLoading(false);
            if (onComplete) onComplete();
          }
          
          reject(url);
        };
        
        // Set priority loading for critical images
        if (priority) {
          img.fetchPriority = 'high';
        }
        
        img.src = url;
      });
    };

    // Load all images
    const loadPromises = imageUrls.map(loadImage);
    
    // If priority is true, load images sequentially for better performance
    if (priority) {
      loadPromises.reduce((promise, nextPromise) => 
        promise.then(() => nextPromise)
      );
    }

  }, [imageUrls, onComplete, onProgress, onError, priority]);

  return {
    loadedImages,
    failedImages,
    isLoading,
    progress,
    isComplete: progress === 100 && !isLoading
  };
};

/**
 * Hook for preloading critical images on page load
 * @param {Array} criticalImages - Critical images to preload
 * @returns {Object} - Loading state
 */
export const useCriticalImagePreloader = (criticalImages = []) => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!criticalImages.length) {
      setIsReady(true);
      return;
    }

    const preloadCriticalImages = async () => {
      try {
        const promises = criticalImages.map(url => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.fetchPriority = 'high';
            img.src = url;
          });
        });

        await Promise.all(promises);
        setIsReady(true);
      } catch (error) {
        console.warn('Some critical images failed to load:', error);
        setIsReady(true); // Still mark as ready to not block the UI
      }
    };

    preloadCriticalImages();
  }, [criticalImages]);

  return { isReady };
};
