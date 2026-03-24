// Video utility functions to handle media resource loading issues

/**
 * Safely load a video element with error handling
 * @param {HTMLVideoElement} videoElement - The video element to load
 * @param {string} src - The video source URL
 */
export const safeLoadVideo = (videoElement, src) => {
  if (!videoElement) return;

  // Set up error handling
  videoElement.onerror = (e) => {
    console.warn('Video loading error:', src, e);
    // Optionally show a fallback image or placeholder
  };

  // Set up load handling
  videoElement.onloadstart = () => {
    console.log('Video loading started:', src);
  };

  videoElement.oncanplay = () => {
    console.log('Video can play:', src);
  };

  // Set the source
  videoElement.src = src;
};

/**
 * Optimize video loading for better performance
 * @param {HTMLVideoElement} videoElement - The video element to optimize
 */
export const optimizeVideoLoading = (videoElement) => {
  if (!videoElement) return;

  // Set optimal loading attributes
  videoElement.preload = 'metadata';
  videoElement.muted = true;
  videoElement.playsInline = true;
  
  // Add error handling
  videoElement.onerror = (e) => {
    console.warn('Video optimization error:', e);
  };
};

/**
 * Handle video play/pause with error handling
 * @param {HTMLVideoElement} videoElement - The video element
 * @param {boolean} shouldPlay - Whether to play or pause
 */
export const safeVideoControl = async (videoElement, shouldPlay) => {
  if (!videoElement) return;

  try {
    if (shouldPlay) {
      await videoElement.play();
    } else {
      videoElement.pause();
    }
  } catch (error) {
    console.warn('Video control error:', error);
    // Handle autoplay policy restrictions
    if (error.name === 'NotAllowedError') {
      console.log('Autoplay blocked by browser policy');
    }
  }
};

/**
 * Check if video format is supported
 * @param {string} format - Video format (mp4, webm, etc.)
 * @returns {boolean} - Whether the format is supported
 */
export const isVideoFormatSupported = (format) => {
  const video = document.createElement('video');
  return video.canPlayType(`video/${format}`) !== '';
};

/**
 * Get optimal video format based on browser support
 * @returns {string} - Optimal video format
 */
export const getOptimalVideoFormat = () => {
  if (isVideoFormatSupported('webm')) return 'webm';
  if (isVideoFormatSupported('mp4')) return 'mp4';
  return 'mp4'; // fallback
};
