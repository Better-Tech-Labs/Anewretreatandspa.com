import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Static export has no image server, so photos are resized ahead of time
    // (npm run images) and src/lib/imageLoader.ts picks the right copy.
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
    // Keep in step with IMAGE_WIDTHS in src/lib/imageWidths.mjs.
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [160, 320],
  },
};

export default nextConfig;
