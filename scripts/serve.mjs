import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const MIME = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  xml: 'application/xml; charset=utf-8',
  json: 'application/json',
  avif: 'image/avif',
  webp: 'image/webp',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

function resolvePath(url) {
  // Strip query string
  const urlPath = url.split('?')[0];
  let filePath = path.join(distDir, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  return filePath;
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 Not Found: ${req.url}`);
    return;
  }

  const ext = path.extname(filePath).slice(1).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\nLocal server running at http://localhost:${PORT}`);
  console.log(`\nTest URLs:`);
  console.log(`  Homepage redirect : http://localhost:${PORT}/`);
  console.log(`  Vietnamese home   : http://localhost:${PORT}/vi/`);
  console.log(`  English home      : http://localhost:${PORT}/en/`);
  console.log(`  Post (vi)         : http://localhost:${PORT}/vi/posts/tep-mau/`);
  console.log(`  Post (en)         : http://localhost:${PORT}/en/posts/tep-mau/`);
  console.log(`  Collection (vi)   : http://localhost:${PORT}/vi/collection/shrimps/tep-bluedream/`);
  console.log(`  Sitemap           : http://localhost:${PORT}/sitemap.xml`);
  console.log(`\nCtrl+C to stop.\n`);
});
