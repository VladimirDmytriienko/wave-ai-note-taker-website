"use client";

import { useRef, type ReactNode } from "react";

import { useScrollProgress, type ScrollRange } from "./use-scroll-progress";

interface ScrollSceneProps {
  children: ReactNode;
  range: ScrollRange;
  /**
   * Split progress into this many steps. Descendants marked
   * `data-step-item={index}` get `data-active` = `before` | `current` | `after`.
   */
  steps?: number;
  skipOnReducedMotion?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}

/** Marks the step that owns the current progress and where the others sit. */
const markSteps = (root: HTMLElement, progress: number, steps: number) => {
  const current = Math.min(steps - 1, Math.floor(progress * steps));
  if (root.dataset.step === String(current)) return;
  root.dataset.step = String(current);

  for (const item of root.querySelectorAll<HTMLElement>("[data-step-item]")) {
    const index = Number(item.dataset.stepItem);
    item.dataset.active =
      index === current ? "current" : index < current ? "before" : "after";
  }
};

/**
 * A scroll-driven stage. Renders a plain element that exposes scroll progress
 * to CSS as `var(--p)` and switches to its animated layout via
 * `[data-scene="on"]` — so the server-rendered, script-free layout is always
 * the fallback, and every child can stay a Server Component.
 */
export const ScrollScene = ({
  children,
  range,
  steps,
  skipOnReducedMotion = true,
  className,
  ...aria
}: ScrollSceneProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useScrollProgress(ref, {
    range,
    skipOnReducedMotion,
    onProgress: steps
      ? (progress) => {
          if (ref.current) markSteps(ref.current, progress, steps);
        }
      : undefined,
  });

  return (
    <div ref={ref} className={className} {...aria}>
      {children}
    </div>
  );
};
