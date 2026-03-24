import React, { useEffect } from 'react';
import { useCriticalImagePreloader } from '../../hooks/useImagePreloader';

const ImagePreloader = ({ criticalImages = [] }) => {
  const { isReady } = useCriticalImagePreloader(criticalImages);

  // Add critical images that should be preloaded on app start
  const defaultCriticalImages = [
    '/assets/images/cg2.png', // Main logo
    '/assets/images/assistant1.png', // Assistant icon
    '/assets/images/HEADERLOGO.png', // Header logo
    '/assets/images/Group8756.png', // Group logo
    '/assets/images/about.png', // About section image
    '/assets/images/credit.png', // Credit card icon
    '/assets/images/debit.png', // Debit card icon
    '/assets/images/upi.png', // UPI icon
    '/assets/images/netbanking.png', // Net banking icon
  ];

  const allCriticalImages = [...defaultCriticalImages, ...criticalImages];

  useEffect(() => {
    // Preload critical images
    allCriticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Cleanup function
    return () => {
      allCriticalImages.forEach(src => {
        const existingLink = document.querySelector(`link[href="${src}"]`);
        if (existingLink) {
          document.head.removeChild(existingLink);
        }
      });
    };
  }, [allCriticalImages]);

  // This component doesn't render anything visible
  return null;
};

export default ImagePreloader;
