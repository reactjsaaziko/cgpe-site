// Browser utility functions for video optimization

/**
 * Detect browser type and version
 */
export const getBrowserInfo = () => {
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';
  let version = 'Unknown';

  if (userAgent.includes('Chrome')) {
    browser = 'Chrome';
    version = userAgent.match(/Chrome\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Firefox')) {
    browser = 'Firefox';
    version = userAgent.match(/Firefox\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    browser = 'Safari';
    version = userAgent.match(/Version\/(\d+)/)?.[1] || 'Unknown';
  } else if (userAgent.includes('Edge')) {
    browser = 'Edge';
    version = userAgent.match(/Edge\/(\d+)/)?.[1] || 'Unknown';
  }

  return { browser, version };
};

/**
 * Check if browser supports autoplay
 */
export const supportsAutoplay = () => {
  const { browser, version } = getBrowserInfo();
  const versionNum = parseInt(version);

  // Modern browsers generally support autoplay with muted videos
  if (browser === 'Chrome' && versionNum >= 66) return true;
  if (browser === 'Firefox' && versionNum >= 66) return true;
  if (browser === 'Safari' && versionNum >= 11) return true;
  if (browser === 'Edge' && versionNum >= 79) return true;

  return false;
};

/**
 * Check if browser supports video preloading
 */
export const supportsVideoPreload = () => {
  const video = document.createElement('video');
  return 'preload' in video;
};

/**
 * Get optimal video preload strategy based on browser
 */
export const getOptimalPreloadStrategy = () => {
  const { browser } = getBrowserInfo();
  
  // Some browsers handle preload differently
  if (browser === 'Safari') {
    return 'metadata'; // Safari is more conservative with preloading
  }
  
  return 'metadata'; // Default to metadata for better performance
};

/**
 * Check if browser supports specific video codecs
 */
export const supportsVideoCodec = (codec) => {
  const video = document.createElement('video');
  return video.canPlayType(`video/${codec}`) !== '';
};

/**
 * Get optimal video format for current browser
 */
export const getOptimalVideoFormat = () => {
  if (supportsVideoCodec('webm')) return 'webm';
  if (supportsVideoCodec('mp4')) return 'mp4';
  return 'mp4'; // fallback
};

/**
 * Check if browser is on mobile device
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Get optimal video loading strategy based on device and browser
 */
export const getVideoLoadingStrategy = () => {
  const isMobile = isMobileDevice();
  const { browser } = getBrowserInfo();
  
  return {
    preload: isMobile ? 'none' : getOptimalPreloadStrategy(),
    autoplay: supportsAutoplay() && !isMobile,
    muted: true, // Always mute for autoplay compatibility
    playsInline: true,
    loop: false,
    controls: false
  };
};
