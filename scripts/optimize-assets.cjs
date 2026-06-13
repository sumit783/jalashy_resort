const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

sharp.cache(false);

const PUBLIC = path.join(__dirname, "..", "public");
const ASSETS = path.join(PUBLIC, "assets");

async function optimizeImage(filename, options = {}) {
  const inputPath = path.join(ASSETS, filename);
  const tempPath = path.join(ASSETS, `temp_${filename}`);

  if (!fs.existsSync(inputPath)) {
    console.log(`  ⚠ File not found: ${filename}`);
    return;
  }

  try {
    const originalSize = fs.statSync(inputPath).size;
    let pipeline = sharp(inputPath);

    // Resize if width or height exceeds 2048
    const metadata = await pipeline.metadata();
    if (metadata.width > 2048 || metadata.height > 2048) {
      if (metadata.width >= metadata.height) {
        pipeline = pipeline.resize({ width: 2048, withoutEnlargement: true });
      } else {
        pipeline = pipeline.resize({ height: 2048, withoutEnlargement: true });
      }
    }

    // Convert to webp with quality 80
    const outputFormat = options.format || "webp";
    if (outputFormat === "webp") {
      pipeline = pipeline.webp({ quality: 80 });
    } else if (outputFormat === "jpeg") {
      pipeline = pipeline.jpeg({ quality: 80 });
    }

    const outputFilename = options.outputName || filename.replace(/\.(png|jpg|jpeg)$/i, ".webp");
    const outputPath = path.join(ASSETS, outputFilename);

    await pipeline.toFile(tempPath);

    // Overwrite the destination and delete temp file
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }
    fs.renameSync(tempPath, outputPath);

    // If we changed name/extension, delete the original input file
    if (inputPath !== outputPath && fs.existsSync(inputPath)) {
      fs.unlinkSync(inputPath);
    }

    const newSize = fs.statSync(outputPath).size;
    const savings = Math.round((originalSize - newSize) / 1024);
    console.log(`  ✓ Optimized: ${filename} -> ${outputFilename} (${Math.round(originalSize / 1024)}KB -> ${Math.round(newSize / 1024)}KB) | Saved ${savings}KB`);
  } catch (err) {
    console.error(`  ✗ Failed to optimize ${filename}:`, err.message);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

async function main() {
  console.log("\n── Running Asset Optimizations ──\n");

  // 1. Optimize large webp files (Resizing to max-2048px width/height and quality 80)
  await optimizeImage("hero-resort.webp");
  await optimizeImage("lakeside.webp");
  await optimizeImage("restaurant.webp");
  await optimizeImage("room.webp");

  // 2. Compress standard webp files to quality 80
  await optimizeImage("wedding-lawn.webp");
  await optimizeImage("pool.webp");
  await optimizeImage("aamrai.webp");

  // 3. Convert misnamed .png JPEGs to .webp at quality 80
  await optimizeImage("lakeside_suite.png");
  await optimizeImage("garden_villa.png");
  await optimizeImage("mango_cottage.png");

  // 4. Clean up redundant / unused files in root public/
  const redundantFiles = [
    path.join(PUBLIC, "lakeside.jpg"),
    path.join(PUBLIC, "wedding-lawn.jpg")
  ];

  console.log("\n── Cleaning up redundant root image assets ──\n");
  for (const file of redundantFiles) {
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      console.log(`  ✓ Deleted redundant root image: ${path.basename(file)}`);
    } else {
      console.log(`  ⚠ Already clean: ${path.basename(file)}`);
    }
  }

  console.log("\n✅ Image Delivery Optimization Completed!\n");
}

main().catch(console.error);
