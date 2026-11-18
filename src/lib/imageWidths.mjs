/**
 * Widths every photo in public/images is pre-resized to. Shared by the resize
 * script (scripts/optimize-images.mjs) and the next/image loader
 * (src/lib/imageLoader.ts) so the two can never disagree.
 */
export const IMAGE_WIDTHS = [320, 480, 828, 1200, 1920];

/** Folder (under public/) holding the resized copies. Generated, not committed. */
export const OPTIMIZED_DIR = "/images/_opt";
