const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "sliderImage");

async function main() {
  const files = fs.readdirSync(dir);
  console.log("Optimizing background slider images under public/sliderImage...");

  // Clean up any stale .tmp files first
  for (const file of files) {
    if (file.endsWith(".tmp")) {
      const tempPath = path.join(dir, file);
      fs.unlinkSync(tempPath);
    }
  }

  // Reload file list after cleaning
  const activeFiles = fs.readdirSync(dir);

  for (const file of activeFiles) {
    const filePath = path.join(dir, file);
    if (/\.webp$/i.test(file) && fs.statSync(filePath).isFile()) {
      try {
        const tempPath = filePath + ".tmp";
        
        // Read file into buffer to avoid Windows file lock (EBUSY)
        const buffer = fs.readFileSync(filePath);

        // Resize to maximum width of 1920px while preserving aspect ratio, quality 75 WebP
        await sharp(buffer)
          .resize({ width: 1920, withoutEnlargement: true })
          .webp({ quality: 75 })
          .toFile(tempPath);

        const origSize = buffer.length;
        const newSize = fs.statSync(tempPath).size;

        // Replace original file with optimized one
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);

        const origKB = Math.round(origSize / 1024);
        const newKB = Math.round(newSize / 1024);
        const savings = origKB - newKB;
        const pct = Math.round((savings / origKB) * 100);

        console.log(`✓ Optimized: ${file} (${origKB} KB → ${newKB} KB, saved ${savings} KB, -${pct}%)`);
      } catch (err) {
        console.error(`✗ Failed to optimize ${file}:`, err.message);
      }
    }
  }

  console.log("\nAll slider images optimized successfully!");
}

main().catch(console.error);
