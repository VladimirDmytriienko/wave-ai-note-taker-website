# What the website still needs

Everything below is a deliberate placeholder. Each one is visible in the UI or
marked in the source, so nothing invented ships by accident.

## 1. Screenshots (blocking — they are the main visual)

None exist in the repository, so every screen renders a marked placeholder of
the correct shape. Capture spec: **iPhone 16 Pro** (or any 19.5:9 device),
portrait, dark mode, status bar included, PNG.

| Screen | What to capture | File |
|---|---|---|
| `library` | Recordings list with a few entries, search field, folder tabs | `public/screenshots/library.png` |
| `recording` | Capture sheet mid-recording: waveform, timer, transport | `public/screenshots/recording.png` |
| `transcript` | Recording detail with a finished transcript, Transcript tab active | `public/screenshots/transcript.png` |
| `playback` | Recording detail mid-playback: scrub bar, timers, speed control | `public/screenshots/playback.png` |
| `folders` | Folders screen: All Recordings, Favourites, custom folders | `public/screenshots/folders.png` |
| `settings` | Settings with the Appearance group (Language, Theme) | `public/screenshots/settings.png` |

Then set `src` for each entry in `src/config/screenshots.ts`.

Content shown in the captures matters as much as the framing: realistic titles,
durations and dates read far better than placeholder rows.

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

- [ ] `assets/images/icon.png` in the iOS project is still the **Expo template
      icon**. The website derives its favicon, Apple touch icon and social card
      from it (`npm run icons`), so replacing it there updates the site too.

## Claims deliberately left out

- **Speaker diarization** — works on device but is explicitly not in release 1
  (`docs/transcription.md`), so the site never mentions it.
- **Transcription accuracy**, benchmarks or speed figures — measured numbers
  exist internally but none are stated publicly.
