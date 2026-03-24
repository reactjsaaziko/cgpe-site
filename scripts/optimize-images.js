const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Check if sharp is available, if not, provide instructions
try {
  require.resolve('sharp');
} catch (e) {
  console.log('❌ Sharp not found. Install it with: npm install sharp --save-dev');
  console.log('   Sharp is needed for image optimization.');
  process.exit(1);
}

const inputDir = path.join(__dirname, '../public/assets/images');
const outputDir = path.join(__dirname, '../public/assets/images/optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Image optimization configurations
const configs = [
  { suffix: '_sm', width: 320, quality: 80 },
  { suffix: '_md', width: 640, quality: 85 },
  { suffix: '_lg', width: 1024, quality: 90 },
  { suffix: '_xl', width: 1280, quality: 95 }
];

async function optimizeImage(inputPath, outputPath, config) {
  try {
    await sharp(inputPath)
      .resize(config.width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: config.quality, progressive: true })
      .toFile(outputPath);
    
    return true;
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
    return false;
  }
}

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|webp)$/i.test(file)
  );

  let processed = 0;
  let totalSize = 0;
  let optimizedSize = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const stats = fs.statSync(inputPath);
    const originalSize = stats.size;
    totalSize += originalSize;

    console.log(`Processing: ${file} (${(originalSize / 1024).toFixed(2)} KB)`);

    // Create optimized versions
    for (const config of configs) {
      const nameWithoutExt = path.parse(file).name;
      const ext = path.parse(file).ext;
      const outputFile = `${nameWithoutExt}${config.suffix}${ext}`;
      const outputPath = path.join(outputDir, outputFile);

      const success = await optimizeImage(inputPath, outputPath, config);
      if (success) {
        const optimizedStats = fs.statSync(outputPath);
        optimizedSize += optimizedStats.size;
        console.log(`  ✓ ${outputFile}: ${(optimizedStats.size / 1024).toFixed(2)} KB`);
      }
    }

    processed++;
  }

  console.log(`\n📊 Optimization Summary:`);
  console.log(`  Files processed: ${processed}`);
  console.log(`  Original size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Optimized size: ${(optimizedSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`  Space saved: ${(((totalSize - optimizedSize) / totalSize) * 100).toFixed(1)}%`);
  console.log(`\n✅ Optimization complete! Optimized images saved to: ${outputDir}`);
}

optimizeImages().catch(console.error);
