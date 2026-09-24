/**
 * Derives the favicon, Apple touch icon and the public brand image from the
 * Wave app icon, so there is exactly one source for the mark.
 *
 * Source: src/assets/brand/wave-icon.png — a copy of the iOS app icon
 * (`assets/images/wave-logo.png` in the app, on the recorder branch).
 * Run with `npm run icons` after the app icon changes.
 */
import { mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "src/assets/brand/wave-icon.png");

const outputs = [
  { path: "src/app/icon.png", size: 64 },
  { path: "src/app/apple-icon.png", size: 180 },
  { path: "public/brand/wave-icon.png", size: 512 },
];

for (const { path, size } of outputs) {
  const target = resolve(root, path);
  await mkdir(dirname(target), { recursive: true });
  await sharp(source).resize(size, size, { fit: "cover" }).png({ compressionLevel: 9 }).toFile(target);
  console.log(`${path}  ${size}x${size}`);
}
