const fs = require("fs");
const path = require("path");
const https = require("https");

const destDir = path.join(__dirname, "..", "public", "roomImages");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const videos = [
  {
    id: "19403230",
    name: "room-1.mp4"
  },
  {
    id: "11051002",
    name: "room-2.mp4"
  },
  {
    id: "31391673",
    name: "room-3.mp4"
  }
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
      }
    }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }

      if (res.statusCode !== 200) {
        return reject(new Error(`Server responded with status code: ${res.statusCode}`));
      }

      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);

      fileStream.on("finish", () => {
        fileStream.close();
        resolve();
      });

      fileStream.on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }).on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  console.log("Starting premium room videos download from Pexels...");
  for (const video of videos) {
    const url = `https://www.pexels.com/video/${video.id}/download/`;
    const dest = path.join(destDir, video.name);
    console.log(`Downloading video ID ${video.id} to ${video.name}...`);
    try {
      await downloadFile(url, dest);
      const sizeMB = (fs.statSync(dest).size / (1024 * 1024)).toFixed(2);
      console.log(`✓ Downloaded ${video.name} successfully! (Size: ${sizeMB} MB)`);
    } catch (err) {
      console.error(`✗ Failed to download ${video.name}:`, err.message);
    }
  }
  console.log("Downloads completed!");
}

main().catch(console.error);
