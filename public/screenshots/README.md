# Screenshots

Application captures used on the site, by device:

- `iphone/` — portrait, 19.5:9 (currently 921 × 2000 WebP)
- `ipad/` — landscape, 4:3 (currently 2000 × 1500 WebP)

To add or replace one: put the file here and point `src` at it in
`src/config/screenshots.ts`, with its pixel `width` and `height`. A registered
entry with `src: null` renders a marked placeholder of the right shape.
