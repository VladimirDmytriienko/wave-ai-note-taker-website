/**
 * Derives the website's favicon, Apple touch icon and brand image from the iOS
 * app icon, so there is exactly one source of truth for the mark.
 *
 * Source: ../assets/images/icon.png (the app icon used by the Expo project).
 * Run with `npm run icons` after the app icon changes.
 */
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const source = resolve(root, "../assets/images/icon.png");

const outputs = [
  { path: "src/app/icon.png", size: 64 },
  { path: "src/app/apple-icon.png", size: 180 },
  { path: "public/brand/app-icon.png", size: 512 },
];

for (const { path, size } of outputs) {
  const target = resolve(root, path);
  await mkdir(dirname(target), { recursive: true });
  await sharp(source).resize(size, size, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(target);
  console.log(`${path}  ${size}x${size}`);
}
