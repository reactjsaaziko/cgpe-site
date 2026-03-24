import React, { useEffect } from 'react';

const PerformanceMonitor = () => {
  useEffect(() => {
    // Monitor Core Web Vitals
    const measurePerformance = () => {
      // Largest Contentful Paint (LCP)
      if ('PerformanceObserver' in window) {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          console.log('LCP:', lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay (FID)
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            console.log('FID:', entry.processingStart - entry.startTime);
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          console.log('CLS:', clsValue);
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      }

      // Resource timing
      if ('performance' in window && 'getEntriesByType' in performance) {
        const resources = performance.getEntriesByType('resource');
        const largeResources = resources.filter(resource => resource.transferSize > 100000); // > 100KB
        
        if (largeResources.length > 0) {
          console.warn('Large resources detected:', largeResources.map(r => ({
            name: r.name,
            size: (r.transferSize / 1024).toFixed(2) + ' KB'
          })));
        }
      }
    };

    // Run performance monitoring after page load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
    }

    // Monitor image loading performance
    const monitorImageLoading = () => {
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        const startTime = performance.now();
        
        img.addEventListener('load', () => {
          const loadTime = performance.now() - startTime;
          if (loadTime > 1000) { // Images taking more than 1 second
            console.warn(`Slow loading image: ${img.src} (${loadTime.toFixed(2)}ms)`);
          }
        });
      });
    };

    // Monitor after a short delay to catch dynamically loaded images
    setTimeout(monitorImageLoading, 1000);

  }, []);

  return null; // This component doesn't render anything
};

export default PerformanceMonitor;
