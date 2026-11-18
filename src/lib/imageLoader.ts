import { IMAGE_WIDTHS, OPTIMIZED_DIR } from "./imageWidths.mjs";

/**
 * next/image loader for the static export. The site has no image server, so
 * each photo is resized ahead of time (npm run images) and this picks the
 * smallest copy that still covers the width the browser asked for. A phone
 * gets a ~60KB file instead of the 1MB original.
 */

const PHOTO_PATTERN = /^\/images\/([^/]+)\.webp$/;
const LARGEST_WIDTH = IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];

interface LoaderInput {
  src: string;
  width: number;
}

export function optimizedImagePath(src: string, width: number): string {
  const match = PHOTO_PATTERN.exec(src);
  // Logos, icons and anything outside /images are served as they are.
  if (!match) return src;
  const variant = IMAGE_WIDTHS.find((candidate) => candidate >= width) ?? LARGEST_WIDTH;
  return `${OPTIMIZED_DIR}/${encodeURIComponent(match[1])}-${variant}.webp`;
}

export default function imageLoader({ src, width }: LoaderInput): string {
  return optimizedImagePath(src, width);
}
