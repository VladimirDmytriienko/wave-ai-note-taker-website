/**
 * FAQ content (English).
 *
 * Long-form copy lives per locale under `src/content/<locale>/`, next to the
 * legal documents, rather than in the UI message catalog — full sentences make
 * poor message keys. Adding a language means adding a sibling folder.
 *
 * Every published answer below is sourced from the app itself. Questions whose
 * answer is not settled yet are marked `draft: true`: they stay in the file as
 * a reminder but are filtered out of everything the site renders.
 */

export interface FaqEntry {
  /** Stable anchor id — used for deep links and structured data. */
  readonly id: string;
  readonly question: string;
  /** Paragraphs. */
  readonly answer: readonly string[];
  /** Not rendered anywhere until the answer is confirmed. */
  readonly draft?: true;
  /** What is still needed, for the maintainer. Never rendered. */
  readonly todo?: string;
}

export const faq: readonly FaqEntry[] = [
  {
    id: "audio-leaves-device",
    question: "Does my audio ever leave my iPhone?",
    answer: [
      "No. Recording and transcription both run on your device, and Wave has no server to send anything to.",
    ],
  },
  {
    id: "account",
    question: "Do I need an account?",
    answer: [
      "No. There is no sign-in, no sync and nothing to configure. Open the app and press record.",
    ],
  },
  {
    id: "first-transcription-download",
    question: "Why does the first transcription take longer?",
    answer: [
      "The speech model is downloaded once, the first time you transcribe something, and then kept on your device. Later transcriptions start straight away.",
      "Preparing the model also takes a moment the first time you use it after opening the app.",
    ],
  },
  {
    id: "offline",
    question: "Does Wave work offline?",
    answer: [
      "Recording, playback and search work offline. Transcription works offline too, once the speech model has finished downloading.",
    ],
  },
  {
    id: "languages",
    question: "What languages does the app support?",
    answer: [
      "Wave's interface is available in English and Ukrainian, and follows your iPhone's light or dark appearance.",
    ],
  },
  {
    id: "requirements",
    question: "Which devices does Wave run on?",
    answer: ["Wave requires an iPhone running iOS 17 or later."],
  },

  // ── Not published yet ─────────────────────────────────────────────────────
  {
    id: "price",
    question: "How much does Wave cost?",
    answer: [],
    draft: true,
    todo: "Pricing model is undecided — free, paid up front, or in-app purchase.",
  },
  {
    id: "transcription-languages",
    question: "Which languages can Wave transcribe?",
    answer: [],
    draft: true,
    todo:
      "Confirm the list of speech languages shipping in release 1 (the engine " +
      "supports many; the app should only claim the ones that are tested).",
  },
  {
    id: "model-size",
    question: "How much storage does the speech model need?",
    answer: [],
    draft: true,
    todo:
      "The in-app string says ~60 MB, docs/transcription.md measures a 626 MB " +
      "model. Confirm the shipping figure before stating a number publicly.",
  },
  {
    id: "export",
    question: "Can I export a recording or its transcript?",
    answer: [],
    draft: true,
    todo: "Sharing exists in the UI; confirm what it produces before describing it.",
  },
];

/** Entries the site is allowed to show. */
export const publishedFaq: readonly FaqEntry[] = faq.filter(
  (entry) => entry.draft !== true,
);

/** The short set shown on the home page. */
export const faqPreview: readonly FaqEntry[] = publishedFaq.slice(0, 4);
