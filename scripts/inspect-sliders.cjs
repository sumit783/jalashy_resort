const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "public", "sliderImage");

async function main() {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isFile()) {
      try {
        const metadata = await sharp(filePath).metadata();
        const sizeKB = Math.round(fs.statSync(filePath).size / 1024);
        console.log(`${file}: ${metadata.width}x${metadata.height} (${metadata.format.toUpperCase()}), size: ${sizeKB} KB`);
      } catch (e) {
        console.log(`${file}: failed to read metadata (${e.message})`);
      }
    }
  }
}

main();
