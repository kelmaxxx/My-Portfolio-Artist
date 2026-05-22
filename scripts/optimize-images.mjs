// Convert PNGs in public/assets/ to WebP at two sizes:
//   - kelma-XX.webp         (full quality, max 2400px wide)
//   - kelma-XX@mobile.webp  (smaller, max 900px wide)
// Run via: npm run images
// Re-run any time you drop new PNGs into public/assets/.

import { readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const assetsPath = fileURLToPath(new URL('../public/assets/', import.meta.url));

const FULL = { maxWidth: 2400, quality: 82 };
const MOBILE = { maxWidth: 900, quality: 78 };

async function main() {
  const files = await readdir(assetsPath);
  const pngs = files.filter(f => f.toLowerCase().endsWith('.png'));

  if (pngs.length === 0) {
    console.log('No PNGs found in public/assets/. Nothing to do.');
    return;
  }

  let totalIn = 0;
  let totalOut = 0;

  for (const file of pngs) {
    const inPath = join(assetsPath, file);
    const { name } = parse(file);
    const inSize = (await stat(inPath)).size;
    totalIn += inSize;

    const img = sharp(inPath);
    const meta = await img.metadata();

    // Full
    const fullPath = join(assetsPath, `${name}.webp`);
    await sharp(inPath)
      .resize({ width: Math.min(meta.width ?? FULL.maxWidth, FULL.maxWidth), withoutEnlargement: true })
      .webp({ quality: FULL.quality })
      .toFile(fullPath);
    const fullSize = (await stat(fullPath)).size;

    // Mobile
    const mobilePath = join(assetsPath, `${name}@mobile.webp`);
    await sharp(inPath)
      .resize({ width: Math.min(meta.width ?? MOBILE.maxWidth, MOBILE.maxWidth), withoutEnlargement: true })
      .webp({ quality: MOBILE.quality })
      .toFile(mobilePath);
    const mobileSize = (await stat(mobilePath)).size;

    totalOut += fullSize + mobileSize;

    console.log(
      `${file.padEnd(28)} ${fmt(inSize).padStart(8)} →  ${fmt(fullSize).padStart(8)} (full)  ${fmt(mobileSize).padStart(8)} (mobile)`
    );
  }

  console.log('\nTotal PNG:  ', fmt(totalIn));
  console.log('Total WebP: ', fmt(totalOut), ` (${Math.round((1 - totalOut / totalIn) * 100)}% smaller)`);
}

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return (bytes / 1024 / 1024).toFixed(2) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
