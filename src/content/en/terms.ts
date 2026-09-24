import type { LegalDocument } from "../legal-types";

/**
 * Terms of Use (English) — DRAFT.
 *
 * Structure and plain-language wording are in place; the entity, jurisdiction
 * and pricing terms are marked `todo`. This document must be reviewed by a
 * lawyer before it is published.
 */
export const terms: LegalDocument = {
  title: "Terms of Use",
  description:
    "The terms that apply when you use Wave, the voice notes app for iPhone.",
  updated: "2026-09-24",
  reviewRequired: true,
  intro: [
    "These terms apply when you install or use Wave. By using the app, you agree to them.",
  ],
  sections: [
    {
      id: "licence",
      heading: "Your licence",
      blocks: [
        {
          type: "paragraph",
          text: "You get a personal, non-exclusive, non-transferable licence to use Wave on devices you own or control, in line with the App Store Terms of Service.",
        },
        {
          type: "paragraph",
          text: "You may not copy, sell or redistribute the app, or attempt to derive its source code, except where the law expressly allows it.",
        },
      ],
    },
    {
      id: "your-content",
      heading: "Your recordings",
      blocks: [
        {
          type: "paragraph",
          text: "Everything you record, transcribe or write in Wave is yours. It stays on your device, and we claim no rights over it.",
        },
        {
          type: "paragraph",
          text: "Because your content is stored only on your device, keeping it safe is up to you. Device backups are handled by iOS, not by us.",
        },
      ],
    },
    {
      id: "acceptable-use",
      heading: "Recording responsibly",
      blocks: [
        {
          type: "paragraph",
          text: "Laws about recording people differ from place to place, and some require the consent of everyone being recorded. Using Wave lawfully — including obtaining any consent you need — is your responsibility.",
        },
      ],
    },
    {
      id: "availability",
      heading: "Availability and changes",
      blocks: [
        {
          type: "paragraph",
          text: "We may update the app, change its features or stop distributing it. Where a change materially affects how the app works, we will describe it in the App Store release notes.",
        },
      ],
    },
    {
      id: "price",
      heading: "Price and purchases",
      blocks: [
        {
          type: "todo",
          text: "State whether the app is free or paid, describe any in-app purchases or subscriptions, and reference Apple's refund process.",
        },
      ],
    },
    {
      id: "warranty",
      heading: "No warranty",
      blocks: [
        {
          type: "paragraph",
          text: "Wave is provided as it is. Transcription is produced by a speech model and will sometimes be wrong or incomplete, so do not rely on it as a verbatim record without checking it against the audio.",
        },
        {
          type: "paragraph",
          text: "To the extent the law allows, we give no warranties about the app being uninterrupted, error-free or fit for a particular purpose.",
        },
      ],
    },
    {
      id: "liability",
      heading: "Limitation of liability",
      blocks: [
        {
          type: "paragraph",
          text: "To the extent the law allows, we are not liable for lost recordings, lost data or indirect or consequential losses arising from your use of the app. Nothing in these terms limits liability that cannot be limited by law.",
        },
        {
          type: "todo",
          text: "Have a lawyer confirm the liability cap and the consumer-rights carve-outs for each market where the app is sold.",
        },
      ],
    },
    {
      id: "law",
      heading: "Governing law",
      blocks: [
        {
          type: "todo",
          text: "Add the governing law and the courts that have jurisdiction.",
        },
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      blocks: [
        {
          type: "todo",
          text: "Add the legal entity behind the app, its address, and a contact email address.",
        },
      ],
    },
  ],
};
