import { site } from "@/config/site";

import type { LegalDocument } from "../legal-types";

/**
 * Privacy Policy (English). Short on purpose: the app keeps everything on the
 * device, so there is little to say. Every statement describes how the app
 * actually behaves — update it whenever that changes.
 */
export const privacy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How Allsaid handles your recordings and transcripts — in short: they stay on your iPhone.",
  updated: "2026-09-30",
  intro: [
    "Allsaid is a voice notes app. It has no account and no server of its own: your recordings and transcripts stay on your device.",
  ],
  sections: [
    {
      id: "what-we-collect",
      heading: "What we collect",
      blocks: [
        {
          type: "paragraph",
          text: "Nothing. The app sends no personal information, usage data or analytics. It contains no ads and no tracking.",
        },
        {
          type: "paragraph",
          text: "Recordings, transcripts, folders and settings are stored only on your device. If you use iCloud Backup, they are included in your own device backup, which Apple protects.",
        },
      ],
    },
    {
      id: "microphone",
      heading: "Microphone",
      blocks: [
        {
          type: "paragraph",
          text: "The app uses the microphone only while you record. You can turn access off at any time in iOS Settings.",
        },
      ],
    },
    {
      id: "transcription",
      heading: "Transcription",
      blocks: [
        {
          type: "paragraph",
          text: "Speech is transcribed on your device; audio is never uploaded. The first time a speech model is needed, the app downloads it from Hugging Face (huggingface.co). That request carries no recording or transcript — only what any download does, such as your IP address, handled under Hugging Face's privacy policy: https://huggingface.co/privacy",
        },
      ],
    },
    {
      id: "your-control",
      heading: "Your control",
      blocks: [
        {
          type: "paragraph",
          text: "Delete a recording in the app to remove it with its transcript, or delete the app to remove everything. We keep no copy, so there is nothing for us to export or erase.",
        },
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        {
          type: "paragraph",
          text: "The app is not directed at children and collects no information from anyone.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes",
      blocks: [
        {
          type: "paragraph",
          text: "If this policy changes, the new version is published on this page with a new date.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [
        {
          type: "paragraph",
          text: `Questions about privacy: ${site.supportEmail}`,
        },
      ],
    },
  ],
};
