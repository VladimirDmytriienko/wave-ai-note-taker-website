# Screenshots

Full-resolution captures from the simulator, used as-is — `next/image` turns
them into AVIF/WebP at whatever size each slot needs.

- `iphone-*.png` — portrait, 1320 × 2868
- `ipad-*.png` — landscape, 2752 × 2064

To add or replace one: put the file here and point `src` at it in
`src/config/screenshots.ts`, with its pixel `width` and `height`. A registered
entry with `src: null` renders a marked placeholder of the right shape.
