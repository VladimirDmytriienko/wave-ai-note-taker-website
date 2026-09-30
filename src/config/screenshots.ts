/**
 * Screenshot registry.
 *
 * The website never invents application UI. Every screen it shows is listed
 * here with its real pixel size; a screen whose `src` is `null` renders a
 * clearly marked placeholder of the right shape instead.
 *
 * To add or replace a screenshot: drop the file in `public/screenshots/` and
 * point `src` at it. Captures are full-resolution PNGs straight from the
 * simulator — `next/image` serves them as AVIF/WebP at the size each slot
 * needs, so there is no reason to pre-compress them.
 */
import type { MessageKey } from "@/i18n";

export type Device = "iphone" | "ipad";

export interface ScreenshotAsset {
  readonly device: Device;
  /** Path under `public/`, or `null` until the capture is supplied. */
  readonly src: string | null;
  /** Intrinsic pixel size — sets the aspect ratio of frame and placeholder. */
  readonly width: number;
  readonly height: number;
  /** Alternative text — a message key, so it translates with everything else. */
  readonly alt: MessageKey;
  /** What exactly to capture. Shown by the placeholder while `src` is null. */
  readonly capture: string;
}

const iphone = { device: "iphone", width: 1320, height: 2868 } as const;
const ipad = { device: "ipad", width: 2752, height: 2064 } as const;

export const screenshots = {
  // ── iPhone ──────────────────────────────────────────────────────────────
  library: {
    ...iphone,
    src: "/screenshots/iphone-library-dark.png",
    alt: "Recordings library",
    capture: "Recordings list with search, folder tabs and the record button",
  },
  "library-light": {
    ...iphone,
    src: "/screenshots/iphone-library-light.png",
    alt: "Recordings library in the light appearance",
    capture: "Recordings list in light mode",
  },
  playback: {
    ...iphone,
    src: "/screenshots/iphone-playback-dark.png",
    alt: "Playback controls",
    capture: "Recording sheet: waveform, playhead, skip and play controls",
  },
  "playback-light": {
    ...iphone,
    src: "/screenshots/iphone-playback-light.png",
    alt: "Playback controls in the light appearance",
    capture: "Recording sheet in light mode",
  },
  transcript: {
    ...iphone,
    src: "/screenshots/iphone-transcript-dark.png",
    alt: "Recording transcript",
    capture: "Transcript of a recording, paragraphs with timestamps",
  },
  settings: {
    ...iphone,
    src: "/screenshots/iphone-settings-light.png",
    alt: "Settings",
    capture: "Settings with language and theme",
  },
  // Still wanted — not used on the site until supplied.
  recording: {
    ...iphone,
    src: null,
    alt: "Recording in progress",
    capture: "Capture sheet mid-recording: live waveform, timer, pause/stop",
  },
  folders: {
    ...iphone,
    src: null,
    alt: "Folders",
    capture: "Folders screen with All Recordings, Favourites and custom folders",
  },

  // ── iPad ────────────────────────────────────────────────────────────────
  "ipad-split": {
    ...ipad,
    src: "/screenshots/ipad-transcript-split-dark.png",
    alt: "Recordings beside a transcript on iPad",
    capture: "Split view: library list and transcript, dark",
  },
  "ipad-split-light": {
    ...ipad,
    src: "/screenshots/ipad-transcript-split-light.png",
    alt: "Recordings beside a transcript on iPad, in the light appearance",
    capture: "Split view: library list and transcript, light",
  },
  "ipad-player": {
    ...ipad,
    src: "/screenshots/ipad-library-dark.png",
    alt: "Playback on iPad",
    capture: "Split view: library list and the playback waveform, dark",
  },
  "ipad-player-light": {
    ...ipad,
    src: "/screenshots/ipad-library-light.png",
    alt: "Playback on iPad, in the light appearance",
    capture: "Split view: library list and the playback waveform, light",
  },
  "ipad-transcript": {
    ...ipad,
    src: "/screenshots/ipad-transcript-dark.png",
    alt: "Full-screen transcript on iPad",
    capture: "Transcript full screen with the speakers sidebar",
  },
} as const satisfies Record<string, ScreenshotAsset>;

export type ScreenshotId = keyof typeof screenshots;

export const getScreenshot = (id: ScreenshotId): ScreenshotAsset => screenshots[id];

/** CSS `aspect-ratio` value for a screenshot. */
export const aspectOf = (asset: ScreenshotAsset): string => `${asset.width} / ${asset.height}`;

/** Ids still waiting on a real capture. */
export const missingScreenshots = (): readonly ScreenshotId[] =>
  (Object.keys(screenshots) as ScreenshotId[]).filter((id) => screenshots[id].src === null);
