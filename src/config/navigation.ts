/**
 * Site navigation.
 *
 * `label` is a message key: the header, footer and mobile menu all read from
 * here, so a new page is one entry, not three edits.
 */
import type { MessageKey } from "@/i18n";

export interface NavItem {
  readonly label: MessageKey;
  readonly href: string;
}

/** Primary navigation — in-page anchors on the home page plus the FAQ. */
export const primaryNav = [
  { label: "Features", href: "/#features" },
  { label: "Screens", href: "/#screens" },
  { label: "FAQ", href: "/faq" },
] as const satisfies readonly NavItem[];

export const productNav = [
  { label: "Overview", href: "/" },
  { label: "FAQ", href: "/faq" },
] as const satisfies readonly NavItem[];

export const legalNav = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const satisfies readonly NavItem[];
