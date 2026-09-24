"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * How scroll position maps to progress (0 → 1).
 *
 * - `pin`: the element is taller than the viewport and pins its content with
 *   `position: sticky`. 0 when its top reaches the top of the viewport, 1 when
 *   its bottom reaches the bottom — i.e. across the whole pinned stretch.
 * - `hero`: 0 at the very top of the page, 1 once the element's centre reaches
 *   the viewport's centre. For above-the-fold compositions that should start
 *   "closed" and resolve as the reader begins to scroll.
 */
export type ScrollRange = "pin" | "hero";

interface Options {
  range: ScrollRange;
  /**
   * Leave the element in its static layout when the reader has asked for
   * reduced motion. Default true; scenes that only switch content (rather than
   * move it) can opt out, since CSS already makes their transitions instant.
   */
  skipOnReducedMotion?: boolean;
  /** Called with the new progress on every animation frame it changes. */
  onProgress?: (progress: number) => void;
}

const clamp01 = (value: number): number => Math.min(1, Math.max(0, value));

const measure = (element: HTMLElement, range: ScrollRange): number => {
  const rect = element.getBoundingClientRect();
  const viewport = window.innerHeight;

  if (range === "pin") {
    const travel = rect.height - viewport;
    return travel > 0 ? clamp01(-rect.top / travel) : 0;
  }

  const centre = rect.top + window.scrollY + rect.height / 2;
  const end = centre - viewport / 2;
  return end > 0 ? clamp01(window.scrollY / end) : 1;
};

/**
 * Writes scroll progress to `--p` on the element, once per frame, only while
 * the element is near the viewport.
 *
 * Everything visual is CSS reading `var(--p)`: this hook never re-renders
 * React, so scrolling costs one `getBoundingClientRect` and one style write per
 * frame per scene. The element gets `data-scene="on"` once it is driven, so
 * the static, script-free layout stays the default.
 */
export const useScrollProgress = (
  ref: RefObject<HTMLElement | null>,
  { range, skipOnReducedMotion = true, onProgress }: Options,
): void => {
  // Latest callback without re-subscribing the scroll listener every render.
  const callback = useRef(onProgress);
  useEffect(() => {
    callback.current = onProgress;
  }, [onProgress]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (skipOnReducedMotion && prefersReducedMotion()) return;

    let frame = 0;
    let nearViewport = true;
    let last = -1;

    const update = () => {
      frame = 0;
      const progress = measure(element, range);
      if (Math.abs(progress - last) < 0.0005) return;
      last = progress;
      element.style.setProperty("--p", progress.toFixed(4));
      callback.current?.(progress);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onScroll = () => {
      if (nearViewport) schedule();
    };

    // Skip the work entirely while the scene is far off screen.
    const observer = new IntersectionObserver(
      ([entry]) => {
        nearViewport = entry.isIntersecting;
        if (nearViewport) schedule();
      },
      { rootMargin: "50% 0px 50% 0px" },
    );

    update();
    element.dataset.scene = "on";
    observer.observe(element);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      delete element.dataset.scene;
      element.style.removeProperty("--p");
    };
  }, [ref, range, skipOnReducedMotion]);
};

/** True when the reader has asked the OS for reduced motion. Client-only. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
