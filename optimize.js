const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const DIRS = [
  path.join(__dirname, 'src/assets/couple-cottage-images'),
  path.join(__dirname, 'src/assets/roomImages')
];

async function optimizeImage(filePath) {
  try {
    const stat = fs.statSync(filePath);
    // Only optimize if larger than 1MB
    if (stat.size < 1000000) {
      console.log(`Skipping (already small): ${filePath}`);
      return;
    }

    console.log(`Optimizing: ${filePath} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
    
    // Create a temporary file path
    const tempPath = filePath + '.tmp';
    
    // Process image
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Resize if width is larger than 1920
    if (metadata.width > 1920) {
      image.resize({ width: 1920, withoutEnlargement: true });
    }
    
    // Optimize based on format
    if (filePath.toLowerCase().endsWith('.jpg') || filePath.toLowerCase().endsWith('.jpeg')) {
      image.jpeg({ quality: 80, mozjpeg: true });
    } else if (filePath.toLowerCase().endsWith('.webp')) {
      image.webp({ quality: 80 });
    }
    
    // Save to temp file
    await image.toFile(tempPath);
    
    // Replace original file
    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);
    
    const newStat = fs.statSync(filePath);
    console.log(`✓ Optimized: ${filePath} (New size: ${(newStat.size / 1024 / 1024).toFixed(2)} MB)`);
    
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error);
  }
}

async function run() {
  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) continue;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.webp'].includes(ext)) {
        await optimizeImage(path.join(dir, file));
      }
    }
  }
  console.log('Optimization complete!');
}

run();
