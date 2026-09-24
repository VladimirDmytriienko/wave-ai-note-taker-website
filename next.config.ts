import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

import type { NextConfig } from "next";

// The iOS app and the website are separate npm projects in one repository;
// pinning the root stops the bundler from walking up to the app's lockfile.
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Screenshots are the heaviest thing on the page; AVIF first keeps them
  // small without touching the source PNGs.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Surfaces accidental cross-origin or legacy patterns during development.
  reactStrictMode: true,
  turbopack: { root: projectRoot },
};

export default nextConfig;
