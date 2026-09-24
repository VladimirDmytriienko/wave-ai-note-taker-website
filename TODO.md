# What the website still needs

Everything below is a deliberate placeholder. Each one is visible in the UI or
marked in the source, so nothing invented ships by accident.

## 1. Screenshots

- [x] iPhone: library (light), playback (dark + light), transcript (dark),
      settings (light) — in `public/screenshots/iphone/`.
- [x] iPad: split view (dark + light), player (dark + light), full-screen
      transcript (dark) — in `public/screenshots/ipad/`.

Still wanted — registered in `src/config/screenshots.ts` with `src: null`,
not used on the page until supplied:

| Screen | What to capture |
|---|---|
| `recording` | Capture sheet **mid-recording**: live waveform, timer, pause/stop. Would replace the library shot in the story's "Record" step. |
| `folders` | Folders screen with All Recordings, Favourites and custom folders. |

The supplied files are 921×2000 (iPhone) and 2000×1500 (iPad) WebP — enough
for retina at the sizes used. Original full-resolution PNGs would be a small
further gain.

## 2. App Store

`src/config/site.ts` → `appStore`. Until `status` is `"live"` every call to
action renders "Coming to the App Store" rather than a dead link.

- [ ] `url` — the real listing URL
- [ ] `appleAppId` — numeric id, used in structured data
- [ ] flip `status` to `"live"`
- [ ] replace the custom CTA in `src/components/product/app-store-button.tsx`
      with Apple's official "Download on the App Store" badge artwork

## 3. Contact and site identity

`src/config/site.ts`:

- [ ] `supportEmail` — the footer support column and the legal contact sections
      stay hidden or marked until this exists
- [ ] `socialLinks` — empty for now
- [ ] `NEXT_PUBLIC_SITE_URL` in the deployment environment

## 4. Legal

`/privacy` and `/terms` are drafts that describe the app's real behaviour, with
a visible "Needs review" banner. They must be completed and reviewed by a
lawyer. Open items are marked inline and in
`src/content/en/privacy.ts` / `terms.ts`:

- [ ] legal entity, address and contact email
- [ ] governing law and jurisdiction
- [ ] pricing and refunds clause
- [ ] the provider that hosts the downloaded speech model
- [ ] liability cap and consumer-rights carve-outs

## 5. FAQ answers not yet published

Held in `src/content/en/faq.ts` with `draft: true`, so they do not render:

- [ ] **Price** — free, paid, or in-app purchase?
- [ ] **Transcription languages** — which speech languages ship in release 1?
- [ ] **Model size** — the in-app string says ~60 MB, `docs/transcription.md`
      measures a 626 MB model. Which figure is correct for the shipping build?
- [ ] **Export** — sharing exists in the UI; what exactly does it produce?

## 6. Brand

- [x] The site uses the real Wave logo. The source artwork lives on the
      `feat/recorder-and-take-sheet` branch of the app (`wave-logo.png`,
      `wave-splash-dark.png`); `master` still carries the Expo template icon.
      The website keeps its own copies in `src/assets/brand/`, so it does not
      depend on that branch being merged. If the logo changes, replace those
      two files and run `npm run icons`.

## Claims deliberately left out

- **Speaker diarization** — works on device but is explicitly not in release 1
  (`docs/transcription.md`), so the site never mentions it.
- **Transcription accuracy**, benchmarks or speed figures — measured numbers
  exist internally but none are stated publicly.
