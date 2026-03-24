const fs = require('fs');
const path = require('path');

// Simple bundle analyzer for React build
function analyzeBundle() {
  const buildPath = path.join(__dirname, '../build');
  
  if (!fs.existsSync(buildPath)) {
    console.log('Build directory not found. Run "npm run build" first.');
    return;
  }

  const staticPath = path.join(buildPath, 'static');
  const jsPath = path.join(staticPath, 'js');
  const cssPath = path.join(staticPath, 'css');

  console.log('📊 Bundle Analysis Report');
  console.log('========================\n');

  // Analyze JS files
  if (fs.existsSync(jsPath)) {
    const jsFiles = fs.readdirSync(jsPath);
    let totalJSSize = 0;
    
    console.log('📦 JavaScript Files:');
    jsFiles.forEach(file => {
      const filePath = path.join(jsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalJSSize += stats.size;
      
      console.log(`  ${file}: ${sizeKB} KB`);
    });
    console.log(`  Total JS: ${(totalJSSize / 1024).toFixed(2)} KB\n`);
  }

  // Analyze CSS files
  if (fs.existsSync(cssPath)) {
    const cssFiles = fs.readdirSync(cssPath);
    let totalCSSSize = 0;
    
    console.log('🎨 CSS Files:');
    cssFiles.forEach(file => {
      const filePath = path.join(cssPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalCSSSize += stats.size;
      
      console.log(`  ${file}: ${sizeKB} KB`);
    });
    console.log(`  Total CSS: ${(totalCSSSize / 1024).toFixed(2)} KB\n`);
  }

  // Analyze images
  const imagesPath = path.join(buildPath, 'assets/images');
  if (fs.existsSync(imagesPath)) {
    const imageFiles = fs.readdirSync(imagesPath);
    let totalImageSize = 0;
    let imageCount = 0;
    
    console.log('🖼️  Image Files:');
    imageFiles.forEach(file => {
      const filePath = path.join(imagesPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      totalImageSize += stats.size;
      imageCount++;
      
      if (stats.size > 100 * 1024) { // Files larger than 100KB
        console.log(`  ${file}: ${sizeKB} KB ⚠️  (Large file)`);
      } else {
        console.log(`  ${file}: ${sizeKB} KB`);
      }
    });
    console.log(`  Total Images: ${imageCount} files, ${(totalImageSize / 1024).toFixed(2)} KB\n`);
  }

  // Performance recommendations
  console.log('💡 Performance Recommendations:');
  console.log('  • Enable gzip compression on your server');
  console.log('  • Use a CDN for static assets');
  console.log('  • Implement image optimization (WebP, compression)');
  console.log('  • Consider code splitting for large components');
  console.log('  • Use lazy loading for images and videos');
  console.log('  • Implement service worker for caching');
}

analyzeBundle();
