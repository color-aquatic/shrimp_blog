import { mkdir, readFile, rm, writeFile, cp } from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'glob';
import { transform } from 'esbuild';
import { minify } from 'html-minifier-terser';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

async function ensureDir(dirPath) {
  await mkdir(dirPath, { recursive: true });
}

async function writeMinifiedJs(srcPath, destPath) {
  const code = await readFile(srcPath, 'utf8');
  const result = await transform(code, {
    loader: 'js',
    minify: true,
    target: 'es2018'
  });
  await ensureDir(path.dirname(destPath));
  await writeFile(destPath, result.code, 'utf8');
}

async function writeMinifiedCss(srcPath, destPath) {
  const code = await readFile(srcPath, 'utf8');
  const result = await transform(code, {
    loader: 'css',
    minify: true,
    target: 'es2018'
  });
  await ensureDir(path.dirname(destPath));
  await writeFile(destPath, result.code, 'utf8');
}

async function buildHtml() {
  const srcPath = path.join(rootDir, 'index.html');
  const destPath = path.join(distDir, 'index.html');
  const html = await readFile(srcPath, 'utf8');

  const minifiedHtml = await minify(html, {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    minifyCSS: true,
    minifyJS: true,
    keepClosingSlash: true
  });

  await writeFile(destPath, minifiedHtml, 'utf8');
}

async function copyStaticDirectories() {
  const toCopy = ['collection', 'posts', 'images'];
  for (const dirName of toCopy) {
    await cp(path.join(rootDir, dirName), path.join(distDir, dirName), { recursive: true });
  }
}

async function buildJsAndCss() {
  const jsFiles = await glob('js/**/*.js', { cwd: rootDir, nodir: true });
  const cssFiles = await glob('css/**/*.css', { cwd: rootDir, nodir: true });

  for (const relPath of jsFiles) {
    if (relPath.endsWith('main-old.js')) {
      continue;
    }
    const src = path.join(rootDir, relPath);
    const dest = path.join(distDir, relPath);
    await writeMinifiedJs(src, dest);
  }

  for (const relPath of cssFiles) {
    const src = path.join(rootDir, relPath);
    const dest = path.join(distDir, relPath);
    await writeMinifiedCss(src, dest);
  }
}

async function copyRootSupportFiles() {
  const files = ['clear-cache.html'];
  for (const fileName of files) {
    const src = path.join(rootDir, fileName);
    const dest = path.join(distDir, fileName);
    await cp(src, dest);
  }
}

async function main() {
  await rm(distDir, { recursive: true, force: true });
  await ensureDir(distDir);

  await Promise.all([
    buildHtml(),
    buildJsAndCss(),
    copyStaticDirectories(),
    copyRootSupportFiles()
  ]);

  process.stdout.write('Build completed: dist/\n');
}

main().catch((error) => {
  process.stderr.write(`Build failed: ${error.message}\n`);
  process.exit(1);
});
