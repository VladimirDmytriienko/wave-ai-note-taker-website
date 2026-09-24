/**
 * Screenshot registry.
 *
 * The website never invents application UI. Every screen it shows is listed
 * here; while `src` is `null` the presentation components render a clearly
 * marked placeholder of the right shape, so the layout is final before the
 * real captures exist.
 *
 * To supply a screenshot: drop the PNG into `public/screenshots/` and set
 * `src`. Nothing else needs to change.
 *
 * Capture spec: iPhone 16 Pro (or any 19.5:9 device), portrait, dark mode,
 * status bar included, PNG.
 */
import type { MessageKey } from "@/i18n";

export type ScreenshotId =
  | "library"
  | "recording"
  | "transcript"
  | "playback"
  | "folders"
  | "settings";

export interface ScreenshotAsset {
  readonly id: ScreenshotId;
  /** Path under `public/`, or `null` until the capture is supplied. */
  readonly src: string | null;
  /** Alternative text — a message key, so it translates with everything else. */
  readonly alt: MessageKey;
  /** What exactly to capture. Surfaced in the placeholder during development. */
  readonly capture: string;
}

/** Native pixel size of an iPhone 16 Pro screenshot — the intrinsic ratio. */
export const SCREENSHOT_WIDTH = 1206;
export const SCREENSHOT_HEIGHT = 2622;
export const SCREENSHOT_ASPECT = `${SCREENSHOT_WIDTH} / ${SCREENSHOT_HEIGHT}`;

export const screenshots = {
  library: {
    id: "library",
    src: null,
    alt: "Recordings library",
    capture: "Recordings list with a few entries, search field and folder tabs",
  },
  recording: {
    id: "recording",
    src: null,
    alt: "Recording in progress",
    capture: "Capture sheet mid-recording: waveform, timer, transport controls",
  },
  transcript: {
    id: "transcript",
    src: null,
    alt: "Recording transcript",
    capture: "Recording detail with a finished transcript, Transcript tab active",
  },
  playback: {
    id: "playback",
    src: null,
    alt: "Playback controls",
    capture: "Recording detail mid-playback: scrub bar, timers, speed control",
  },
  folders: {
    id: "folders",
    src: null,
    alt: "Folders",
    capture: "Folders screen with All Recordings, Favourites and custom folders",
  },
  settings: {
    id: "settings",
    src: null,
    alt: "Settings",
    capture: "Settings with the Appearance group (Language and Theme) visible",
  },
} as const satisfies Record<ScreenshotId, ScreenshotAsset>;

export const getScreenshot = (id: ScreenshotId): ScreenshotAsset =>
  screenshots[id];

/** Ids still waiting on a real capture — used by the placeholder tooling. */
export const missingScreenshots = (): readonly ScreenshotId[] =>
  (Object.keys(screenshots) as ScreenshotId[]).filter(
    (id) => screenshots[id].src === null,
  );
