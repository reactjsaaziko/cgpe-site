// Video loading manager to prevent too many simultaneous video loads

class VideoLoadingManager {
  constructor() {
    this.loadingQueue = [];
    this.maxConcurrentLoads = 3; // Limit concurrent video loads
    this.currentLoads = 0;
    this.loadingPromises = new Map();
  }

  /**
   * Add a video to the loading queue
   * @param {string} src - Video source URL
   * @param {Function} loadFunction - Function to load the video
   * @returns {Promise} - Promise that resolves when video is loaded
   */
  async loadVideo(src, loadFunction) {
    // If already loading this video, return existing promise
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    const loadPromise = new Promise(async (resolve, reject) => {
      // Add to queue if too many concurrent loads
      if (this.currentLoads >= this.maxConcurrentLoads) {
        this.loadingQueue.push({ src, loadFunction, resolve, reject });
        return;
      }

      await this.executeLoad(src, loadFunction, resolve, reject);
    });

    this.loadingPromises.set(src, loadPromise);
    return loadPromise;
  }

  /**
   * Execute video loading
   * @param {string} src - Video source URL
   * @param {Function} loadFunction - Function to load the video
   * @param {Function} resolve - Promise resolve function
   * @param {Function} reject - Promise reject function
   */
  async executeLoad(src, loadFunction, resolve, reject) {
    this.currentLoads++;
    
    try {
      const result = await loadFunction();
      resolve(result);
    } catch (error) {
      console.warn('Video loading failed:', src, error);
      reject(error);
    } finally {
      this.currentLoads--;
      this.processQueue();
    }
  }

  /**
   * Process the loading queue
   */
  processQueue() {
    if (this.loadingQueue.length === 0 || this.currentLoads >= this.maxConcurrentLoads) {
      return;
    }

    const next = this.loadingQueue.shift();
    this.executeLoad(next.src, next.loadFunction, next.resolve, next.reject);
  }

  /**
   * Clear loading promises cache
   */
  clearCache() {
    this.loadingPromises.clear();
  }

  /**
   * Get loading statistics
   */
  getStats() {
    return {
      currentLoads: this.currentLoads,
      queueLength: this.loadingQueue.length,
      cachedPromises: this.loadingPromises.size
    };
  }
}

// Create singleton instance
const videoLoadingManager = new VideoLoadingManager();

export default videoLoadingManager;
