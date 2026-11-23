const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

sharp.cache(false);

async function processDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (entry.name.endsWith('.tmp') || entry.name.endsWith('.test')) {
        fs.unlinkSync(fullPath);
        continue;
      }

      const stat = fs.statSync(fullPath);
      // Process any image larger than 500 KB
      if (stat.size > 500 * 1024 && (ext === '.jpg' || ext === '.jpeg' || ext === '.webp' || ext === '.png')) {
        const origSizeMb = (stat.size / (1024 * 1024)).toFixed(2);
        try {
          const inputBuf = fs.readFileSync(fullPath);
          const meta = await sharp(inputBuf).metadata();
          
          let pipeline = sharp(inputBuf);
          if ((meta.width && meta.width > 1920) || (meta.height && meta.height > 1920)) {
            pipeline = pipeline.resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true });
          }

          let outBuf;
          if (ext === '.webp') {
            outBuf = await pipeline.webp({ quality: 80 }).toBuffer();
          } else if (ext === '.jpg' || ext === '.jpeg') {
            outBuf = await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
          } else if (ext === '.png') {
            outBuf = await pipeline.png({ quality: 80, compressionLevel: 8 }).toBuffer();
          }

          if (outBuf && outBuf.length < stat.size) {
            fs.writeFileSync(fullPath, outBuf);
            const newSizeMb = (outBuf.length / (1024 * 1024)).toFixed(2);
            const savedPct = (((stat.size - outBuf.length) / stat.size) * 100).toFixed(1);
            console.log(`[OPTIMIZED] ${fullPath}: ${origSizeMb}MB -> ${newSizeMb}MB (${savedPct}% saved)`);
          } else {
            console.log(`[SKIPPED] ${fullPath}: already optimal (${origSizeMb}MB)`);
          }
        } catch (err) {
          console.error(`[ERROR] ${fullPath}:`, err.message);
        }
      }
    }
  }
}

async function main() {
  console.log('--- Starting Image Compression in src/assets ---');
  await processDirectory('src/assets');
  
  // Also check if src/assets/Website_01.webm exists and remove it as it's duplicate of public/Website_01.webm
  const dupVideo = path.join('src', 'assets', 'Website_01.webm');
  if (fs.existsSync(dupVideo)) {
    fs.unlinkSync(dupVideo);
    console.log('[REMOVED] Duplicate unused video: src/assets/Website_01.webm (3.9 MB)');
  }
  
  console.log('--- Done! ---');
}

main().catch(console.error);
