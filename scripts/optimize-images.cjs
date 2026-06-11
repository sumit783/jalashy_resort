/**
 * Image optimization script for Jalashay Resort
 * - Removes duplicate files
 * - Converts all .jpg files to .webp (quality 85)
 * - Renames rs=w_2560*.webp files to clean names
 * - Deletes originals after conversion
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const PUBLIC = path.join(__dirname, "..", "public");

// ── 1. DUPLICATES TO DELETE (keep canonical copy, delete the duplicate) ──────
const duplicatesToDelete = [
  // outdoor_images/020A6244.jpg is the canonical copy
  path.join(PUBLIC, "sliderImage", "020A6244.jpg"),
  // home_images/020A6228.jpg is the canonical copy
  path.join(PUBLIC, "sliderImage", "020A6228 (1).jpg"),
];

// ── 2. RENAME MAP: old webp name → new clean name (within sliderImage/) ──────
const renameMap = {
  "rs=w_2560.webp":        "slider-1.webp",
  "rs=w_2560 (1).webp":    "slider-2.webp",
  "rs=w_2560 (2).webp":    "slider-3.webp",
  "rs=w_2560 (3).webp":    "slider-4.webp",
  "rs=w_2560,h_1438.webp": "slider-5.webp",
};

// ── HELPER: all jpg files under PUBLIC recursively ──────────────────────────
function findJpgs(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findJpgs(full));
    } else if (entry.isFile() && /\.jpe?g$/i.test(entry.name)) {
      results.push(full);
    }
  }
  return results;
}

async function main() {
  // Step 1: Remove duplicates
  console.log("\n── Step 1: Removing duplicates ─────────────────────────────");
  for (const dup of duplicatesToDelete) {
    if (fs.existsSync(dup)) {
      fs.unlinkSync(dup);
      console.log(`  ✓ Deleted: ${path.relative(PUBLIC, dup)}`);
    } else {
      console.log(`  ⚠ Not found (already removed?): ${path.relative(PUBLIC, dup)}`);
    }
  }

  // Step 2: Convert all remaining .jpg → .webp
  console.log("\n── Step 2: Converting JPG → WebP (quality 85) ──────────────");
  const jpgs = findJpgs(PUBLIC);
  for (const jpgPath of jpgs) {
    const webpPath = jpgPath.replace(/\.jpe?g$/i, ".webp");
    try {
      await sharp(jpgPath)
        .webp({ quality: 85 })
        .toFile(webpPath);
      const origKB = Math.round(fs.statSync(jpgPath).size / 1024);
      const newKB  = Math.round(fs.statSync(webpPath).size / 1024);
      console.log(`  ✓ ${path.relative(PUBLIC, jpgPath)} → ${path.basename(webpPath)} (${origKB}KB → ${newKB}KB)`);
      fs.unlinkSync(jpgPath);
    } catch (err) {
      console.error(`  ✗ Failed: ${jpgPath}`, err.message);
    }
  }

  // Step 3: Rename rs=... webp files to clean names
  console.log("\n── Step 3: Renaming slider WebP files ───────────────────────");
  const sliderDir = path.join(PUBLIC, "sliderImage");
  for (const [oldName, newName] of Object.entries(renameMap)) {
    const oldPath = path.join(sliderDir, oldName);
    const newPath = path.join(sliderDir, newName);
    if (fs.existsSync(oldPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`  ✓ ${oldName} → ${newName}`);
    } else {
      console.log(`  ⚠ Not found: ${oldName}`);
    }
  }

  // Step 4: Summary
  console.log("\n── Step 4: Final file listing ───────────────────────────────");
  for (const sub of ["home_images", "outdoor_images", "roomImages", "sliderImage"]) {
    const dir = path.join(PUBLIC, sub);
    const files = fs.readdirSync(dir).filter(f => !f.startsWith("."));
    console.log(`\n  ${sub}/`);
    files.forEach(f => {
      const kb = Math.round(fs.statSync(path.join(dir, f)).size / 1024);
      console.log(`    ${f}  (${kb} KB)`);
    });
  }

  console.log("\n✅ Done!\n");
}

main().catch(console.error);
