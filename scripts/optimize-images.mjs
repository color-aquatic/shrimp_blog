import path from 'node:path';
import { mkdir } from 'node:fs/promises';
import { glob } from 'glob';
import sharp from 'sharp';

const rootDir = process.cwd();
const sourcePattern = 'images/*.{png,jpg,jpeg}';
const outputDir = path.join(rootDir, 'images', 'optimized');

async function main() {
  await mkdir(outputDir, { recursive: true });
  const files = await glob(sourcePattern, { cwd: rootDir, nodir: true });

  for (const relPath of files) {
    const src = path.join(rootDir, relPath);
    const baseName = path.basename(relPath, path.extname(relPath));

    const webpOutput = path.join(outputDir, `${baseName}.webp`);
    const avifOutput = path.join(outputDir, `${baseName}.avif`);

    await sharp(src)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toFile(webpOutput);

    await sharp(src)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .avif({ quality: 50 })
      .toFile(avifOutput);

    process.stdout.write(`Optimized ${relPath}\n`);
  }
}

main().catch((error) => {
  process.stderr.write(`Image optimization failed: ${error.message}\n`);
  process.exit(1);
});
