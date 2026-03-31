import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const port = Number(process.env.PORT || 3000);
const liveReloadPath = '/__dev_reload';
const watchTargets = [
  rootDir,
  path.join(rootDir, 'css'),
  path.join(rootDir, 'js'),
  path.join(rootDir, 'posts'),
  path.join(rootDir, 'collection'),
  path.join(rootDir, 'images')
];

const MIME = {
  html: 'text/html; charset=utf-8',
  css: 'text/css; charset=utf-8',
  js: 'application/javascript; charset=utf-8',
  json: 'application/json; charset=utf-8',
  xml: 'application/xml; charset=utf-8',
  md: 'text/markdown; charset=utf-8',
  avif: 'image/avif',
  webp: 'image/webp',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
  txt: 'text/plain; charset=utf-8'
};

const liveReloadClients = new Set();

const liveReloadSnippet = `
<script>
(() => {
  if (window.__DEV_LIVE_RELOAD_CONNECTED__) {
    return;
  }

  window.__DEV_LIVE_RELOAD_CONNECTED__ = true;

  const source = new EventSource('${liveReloadPath}');
  source.addEventListener('reload', () => {
    window.location.reload();
  });
  source.onerror = () => {
    source.close();
    setTimeout(() => window.location.reload(), 1000);
  };
})();
</script>
</body>`;

function injectLiveReload(html) {
  if (html.includes(liveReloadPath)) {
    return html;
  }

  return html.replace(/<\/body>/i, liveReloadSnippet);
}

function broadcastReload(changedPath) {
  for (const client of liveReloadClients) {
    client.write(`event: reload\ndata: ${JSON.stringify({ path: changedPath, ts: Date.now() })}\n\n`);
  }
}

function watchForChanges() {
  const watchers = [];
  let debounceTimer = null;
  let lastChangedPath = '';

  const scheduleReload = (changedPath) => {
    lastChangedPath = changedPath;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      console.log(`Reload triggered by ${lastChangedPath}`);
      broadcastReload(lastChangedPath);
    }, 120);
  };

  for (const target of watchTargets) {
    if (!fs.existsSync(target)) {
      continue;
    }

    try {
      const watcher = fs.watch(target, { recursive: true }, (_eventType, filename) => {
        const changedPath = filename ? path.relative(rootDir, path.join(target, filename)) : path.relative(rootDir, target);
        scheduleReload(changedPath.replace(/\\/g, '/'));
      });
      watchers.push(watcher);
    } catch (error) {
      console.warn(`Live reload watch disabled for ${target}: ${error.message}`);
    }
  }

  return watchers;
}

function safeResolvePath(requestUrl = '/') {
  const pathname = decodeURIComponent(requestUrl.split('?')[0] || '/');
  const relativePath = pathname === '/' ? 'index.html' : pathname.replace(/^\//, '');
  const absolutePath = path.resolve(rootDir, relativePath);

  if (!absolutePath.startsWith(rootDir)) {
    return null;
  }

  return absolutePath;
}

function resolvePath(requestUrl) {
  const requestedPath = safeResolvePath(requestUrl);
  if (!requestedPath) {
    return null;
  }

  if (fs.existsSync(requestedPath) && fs.statSync(requestedPath).isDirectory()) {
    return path.join(requestedPath, 'index.html');
  }

  return requestedPath;
}

const server = http.createServer((req, res) => {
  if (req.url === liveReloadPath) {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-store',
      Connection: 'keep-alive'
    });
    res.write(': connected\n\n');

    liveReloadClients.add(res);

    req.on('close', () => {
      liveReloadClients.delete(res);
    });
    return;
  }

  const filePath = resolvePath(req.url);

  if (!filePath || !fs.existsSync(filePath)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`404 Not Found: ${req.url}`);
    return;
  }

  const ext = path.extname(filePath).slice(1).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';

  if (ext === 'html') {
    const html = fs.readFileSync(filePath, 'utf8');
    res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
    res.end(injectLiveReload(html));
    return;
  }

  res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'no-store' });
  fs.createReadStream(filePath).pipe(res);
});

const watchers = watchForChanges();

server.listen(port, () => {
  console.log(`\nDev server running at http://localhost:${port}`);
  console.log('\nUse this for source-based local development without rebuilding dist.');
  console.log('Live reload is enabled for HTML, CSS, JS, Markdown, and image changes.');
  console.log(`Root page      : http://localhost:${port}/`);
  console.log(`Vietnamese     : http://localhost:${port}/index.html?lang=vi`);
  console.log(`English        : http://localhost:${port}/index.html?lang=en`);
  console.log(`Post example   : http://localhost:${port}/index.html?lang=vi&post=tep-mau`);
  console.log(`Product example: http://localhost:${port}/index.html?lang=vi&product=tep-bluedream`);
  console.log('\nCtrl+C to stop.\n');
});

server.on('close', () => {
  for (const watcher of watchers) {
    watcher.close();
  }
  for (const client of liveReloadClients) {
    client.end();
  }
  liveReloadClients.clear();
});