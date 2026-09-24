import type { LegalDocument } from "../legal-types";

/**
 * Privacy Policy (English) — DRAFT.
 *
 * Every statement here describes how the app actually behaves today. The gaps
 * are the ones no engineer can fill in: the legal entity, the jurisdiction and
 * the contact address. They are marked as `todo` blocks and must be completed,
 * and the whole document reviewed by a lawyer, before launch.
 */
export const privacy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "How Wave handles your recordings, transcripts and device data — in short: it keeps them on your iPhone.",
  updated: "2026-09-24",
  reviewRequired: true,
  intro: [
    "Wave is a voice notes app for iPhone. It is built so that your recordings stay on your device: there is no account, no sync and no server that receives what you record.",
    "This policy explains what the app stores, what leaves your device and what it never does.",
  ],
  sections: [
    {
      id: "what-we-collect",
      heading: "What we collect",
      blocks: [
        {
          type: "paragraph",
          text: "Nothing. Wave has no account system, collects no personal information and sends no usage or analytics data.",
        },
        {
          type: "paragraph",
          text: "Your recordings, transcripts, notes, folder names and app settings are stored locally on your iPhone and are covered by the device's own protections, including your passcode and, if you use it, device encryption and iCloud device backups.",
        },
      ],
    },
    {
      id: "microphone",
      heading: "Microphone access",
      blocks: [
        {
          type: "paragraph",
          text: "Wave asks for microphone access so it can record. Audio is written to storage on your device and is used only for playback and transcription inside the app. You can withdraw the permission at any time in iOS Settings.",
        },
      ],
    },
    {
      id: "transcription",
      heading: "Transcription",
      blocks: [
        {
          type: "paragraph",
          text: "Speech is turned into text on your device. Audio is not uploaded for processing, and transcription continues to work with no network connection.",
        },
        {
          type: "paragraph",
          text: "The first time you transcribe something, the app downloads the speech model it needs and keeps it on your device for later use. That download is an ordinary file request: it carries no recording, no transcript and no information about you beyond what any download requires, such as your IP address, which is handled by the hosting provider.",
        },
        {
          type: "todo",
          text: "Name the hosting provider that serves the speech model and link its privacy policy.",
        },
      ],
    },
    {
      id: "no-third-parties",
      heading: "Third parties",
      blocks: [
        {
          type: "paragraph",
          text: "Wave contains no advertising, no tracking software and no third-party analytics.",
        },
        {
          type: "paragraph",
          text: "If you download Wave from the App Store, Apple handles the purchase, the download and any aggregate statistics it reports to us under its own privacy policy. We never receive your recordings through it.",
        },
      ],
    },
    {
      id: "your-control",
      heading: "Your data, your device",
      blocks: [
        {
          type: "paragraph",
          text: "Because your content never leaves your iPhone, you control it directly:",
        },
        {
          type: "list",
          items: [
            "Delete a recording in the app to remove it, along with its transcript and notes.",
            "Delete the app to remove everything it stored.",
            "Revoke microphone access in iOS Settings at any time.",
          ],
        },
        {
          type: "paragraph",
          text: "We hold no copy of your content, so there is nothing for us to export, correct or delete on your behalf.",
        },
      ],
    },
    {
      id: "children",
      heading: "Children",
      blocks: [
        {
          type: "paragraph",
          text: "Wave is not directed at children and does not knowingly collect information from anyone, including children.",
        },
      ],
    },
    {
      id: "changes",
      heading: "Changes to this policy",
      blocks: [
        {
          type: "paragraph",
          text: "If the app changes in a way that affects this policy, the updated version will be published on this page with a new date at the top.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [
        {
          type: "todo",
          text: "Add the legal entity responsible for the app, its address, and a support email address for privacy enquiries.",
        },
      ],
    },
  ],
};
