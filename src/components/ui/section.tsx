import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const spacing = {
  /** Default rhythm between landing sections. */
  default: "py-24 sm:py-32",
  /** Tighter, for sections that sit directly under another block. */
  tight: "py-16 sm:py-20",
  /** The closing call to action, which needs room around it. */
  loose: "py-28 sm:py-40",
} as const;

interface SectionProps {
  children: ReactNode;
  /** Anchor target for in-page navigation. */
  id?: string;
  space?: keyof typeof spacing;
  /** Hairline above the section, fading out at both ends. */
  divider?: boolean;
  className?: string;
  /** Accessible name, when the section has no visible heading of its own. */
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

export const Section = ({
  children,
  id,
  space = "default",
  divider = false,
  className,
  ...aria
}: SectionProps) => (
  <section
    id={id}
    // `overflow-x-clip` contains the decorative glows, which are deliberately
    // wider than their column — without it they widen the document itself and
    // a phone gets a horizontal scrollbar. `clip` rather than `hidden`: it
    // does not create a scroll container, so nothing inside changes behaviour.
    className={cn(
      "relative overflow-x-clip",
      spacing[space],
      className,
    )}
    {...aria}
  >
    {divider ? (
      <div
        aria-hidden="true"
        className="rule-fade absolute inset-x-0 top-0 h-px"
      />
    ) : null}
    {children}
  </section>
);
