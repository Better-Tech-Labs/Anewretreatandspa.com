#!/usr/bin/env node
/**
 * Resizes every photo in public/images to the widths the site serves
 * (src/lib/imageWidths.mjs) and writes them to public/images/_opt.
 * Runs before `npm run dev` and `npm run build`. Copies that are newer than
 * their source are skipped, so repeat runs take a moment.
 *
 * The copies are served with a one-year cache (firebase.json), so to change a
 * photo, save the new one under a NEW file name. Replacing a file in place
 * leaves returning visitors on the old picture.
 */
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { IMAGE_WIDTHS, OPTIMIZED_DIR } from "../src/lib/imageWidths.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = path.join(ROOT, "public", "images");
const OUTPUT_DIR = path.join(ROOT, "public", OPTIMIZED_DIR);
/**
 * WebP quality per width. Large copies are only chosen by high-density
 * screens, where the extra pixels hide compression, so they can go lower.
 */
const SMALL_QUALITY = 70;
const MEDIUM_QUALITY = 60;
const LARGE_QUALITY = 50;
const MEDIUM_FROM_WIDTH = 800;
const LARGE_FROM_WIDTH = 1200;

function qualityFor(width) {
  if (width >= LARGE_FROM_WIDTH) return LARGE_QUALITY;
  if (width >= MEDIUM_FROM_WIDTH) return MEDIUM_QUALITY;
  return SMALL_QUALITY;
}
const BACKUP_MARKER = ".bak.";

async function modifiedTime(file) {
  try {
    return (await stat(file)).mtimeMs;
  } catch {
    return 0; // Missing file: treat as never built.
  }
}

async function resizeOne(file) {
  const source = path.join(SOURCE_DIR, file);
  const name = path.basename(file, ".webp");
  const sourceTime = await modifiedTime(source);
  let written = 0;

  for (const width of IMAGE_WIDTHS) {
    const target = path.join(OUTPUT_DIR, `${name}-${width}.webp`);
    if ((await modifiedTime(target)) >= sourceTime) continue;
    await sharp(source)
      .rotate() // Honour camera orientation before the metadata is dropped.
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: qualityFor(width), effort: 5 })
      .toFile(target);
    written += 1;
  }
  return written;
}

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });
  const photos = (await readdir(SOURCE_DIR)).filter((file) => file.endsWith(".webp") && !file.includes(BACKUP_MARKER));

  let written = 0;
  for (const photo of photos) {
    written += await resizeOne(photo);
  }
  process.stdout.write(`images: ${photos.length} photos, ${written} copies written, ${photos.length * IMAGE_WIDTHS.length - written} up to date\n`);
}

main().catch((error) => {
  process.stderr.write(`images: failed: ${error instanceof Error ? error.message : String(error)}\n`);
  process.exit(1);
});
