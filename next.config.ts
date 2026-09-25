import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

import type { NextConfig } from "next";

// Pin the bundler to this standalone project's directory.
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Screenshots are the heaviest thing on the page; AVIF first keeps them
  // small without touching the source PNGs.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Surfaces accidental cross-origin or legacy patterns during development.
  reactStrictMode: true,
  // Next.js blocks its dev-only resources (scripts, hot reload) for any host
  // other than localhost. Without this, opening the dev server by LAN address
  // — e.g. from a phone — serves HTML that never hydrates. Private-network
  // ranges and Bonjour `.local` names only; has no effect in production.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "*.local"],
  turbopack: { root: projectRoot },
};

export default nextConfig;
