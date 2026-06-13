const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const logoPath = path.join(__dirname, "..", "public", "Jalashay_Logo.webp");
const outputIco = path.join(__dirname, "..", "public", "favicon.ico");
const outputPng = path.join(__dirname, "..", "src", "app", "icon.png");
const outputApple = path.join(__dirname, "..", "src", "app", "apple-icon.png");

async function generate() {
  if (!fs.existsSync(logoPath)) {
    console.error("Error: Jalashay_Logo.webp not found in public/");
    process.exit(1);
  }

  console.log("Generating optimized favicon assets from Jalashay_Logo.webp...");

  // Generate public/favicon.ico (32x32 webp/png converted to ico)
  // Sharp doesn't write direct .ico format natively, but we can write a 32x32 PNG as favicon.ico
  // Browsers support PNG files with the .ico extension or directly. 
  // We will generate a 32x32 PNG file saved as favicon.ico for compatibility.
  await sharp(logoPath)
    .resize(32, 32)
    .png()
    .toFile(outputIco);
  console.log("✓ Generated public/favicon.ico (32x32)");

  // Generate src/app/icon.png (32x32)
  await sharp(logoPath)
    .resize(32, 32)
    .png()
    .toFile(outputPng);
  console.log("✓ Generated src/app/icon.png (32x32)");

  // Generate src/app/apple-icon.png (180x180)
  await sharp(logoPath)
    .resize(180, 180)
    .png()
    .toFile(outputApple);
  console.log("✓ Generated src/app/apple-icon.png (180x180)");

  console.log("Favicon generation completed successfully!");
}

generate().catch(console.error);
