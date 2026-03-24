const fs = require('fs');
const path = require('path');

function checkPreloads() {
  console.log('🔍 Checking preload configurations...\n');

  const srcDir = path.join(__dirname, '../src');
  const publicDir = path.join(__dirname, '../public');

  // Check for large images that should be preloaded
  const imagesDir = path.join(publicDir, 'assets/images');
  const largeImages = [];

  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);
    
    files.forEach(file => {
      const filePath = path.join(imagesDir, file);
      const stats = fs.statSync(filePath);
      const sizeKB = stats.size / 1024;
      
      if (sizeKB > 50) { // Images larger than 50KB
        largeImages.push({
          name: file,
          size: sizeKB
        });
      }
    });
  }

  console.log('📊 Large Images Found:');
  if (largeImages.length > 0) {
    largeImages.forEach(img => {
      console.log(`  ${img.name}: ${img.size.toFixed(2)} KB`);
    });
    console.log('\n💡 Consider adding these to critical image preloads in ImagePreloader.jsx');
  } else {
    console.log('  No large images found.');
  }

  // Check for video files
  const videoFiles = [];
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir);
    
    files.forEach(file => {
      if (/\.(mp4|webm|ogg)$/i.test(file)) {
        const filePath = path.join(imagesDir, file);
        const stats = fs.statSync(filePath);
        const sizeMB = stats.size / 1024 / 1024;
        
        videoFiles.push({
          name: file,
          size: sizeMB
        });
      }
    });
  }

  console.log('\n🎥 Video Files Found:');
  if (videoFiles.length > 0) {
    videoFiles.forEach(video => {
      console.log(`  ${video.name}: ${video.size.toFixed(2)} MB`);
    });
    console.log('\n💡 Consider implementing lazy loading for these videos');
  } else {
    console.log('  No video files found.');
  }

  // Check component imports
  console.log('\n📦 Component Import Analysis:');
  const appFile = path.join(srcDir, 'App.jsx');
  
  if (fs.existsSync(appFile)) {
    const content = fs.readFileSync(appFile, 'utf8');
    const lazyImports = (content.match(/React\.lazy\(\(\) => import\(/g) || []).length;
    const directImports = (content.match(/import.*from.*components/g) || []).length;
    
    console.log(`  Lazy imports: ${lazyImports}`);
    console.log(`  Direct imports: ${directImports}`);
    
    if (lazyImports > directImports) {
      console.log('  ✅ Good: More lazy imports than direct imports');
    } else {
      console.log('  ⚠️  Consider converting more imports to lazy loading');
    }
  }

  console.log('\n🚀 Performance Recommendations:');
  console.log('  1. Use OptimizedImage component for all images');
  console.log('  2. Use OptimizedVideo component for all videos');
  console.log('  3. Implement intersection observer for lazy loading');
  console.log('  4. Add critical images to preload list');
  console.log('  5. Consider using WebP format for images');
  console.log('  6. Implement service worker for caching');
}

checkPreloads();
