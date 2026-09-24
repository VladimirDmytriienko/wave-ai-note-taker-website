"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { useScrollProgress } from "@/components/motion/use-scroll-progress";
import { cn } from "@/lib/cn";

import styles from "./screenshot-carousel.module.css";

export interface CarouselItem {
  readonly key: string;
  /** Rendered on the server and passed down, so no message catalog ships here. */
  readonly node: ReactNode;
  /** Visible caption under the screen. */
  readonly caption: string;
  /** Accessible label for the matching dot control. */
  readonly goToLabel: string;
}

interface ScreenshotCarouselProps {
  items: readonly CarouselItem[];
  /** Section heading, rendered inside the pinned stage so it stays in view. */
  header?: ReactNode;
  labels: {
    carousel: string;
    previous: string;
    next: string;
  };
  className?: string;
}

const isPinned = (root: HTMLElement | null): boolean => root?.dataset.scene === "on";

/**
 * Screenshot gallery with two behaviours from one DOM.
 *
 * - Pinned (default when motion is allowed): the section holds still and
 *   scrolling the page slides the screens sideways.
 * - Native (reduced motion, or before scripts run): a scroll-snap carousel
 *   that works with touch, trackpad, keyboard and no JavaScript at all.
 *
 * The buttons and dots work in both: pinned, they scroll the page to that
 * screen; native, they scroll the track.
 */
export const ScreenshotCarousel = ({
  items,
  header,
  labels,
  className,
}: ScreenshotCarouselProps) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const last = items.length - 1;

  // How far the row overflows its window. Measured before the scene switches
  // on (declared first, so it runs first), so the pinned height is right on
  // the very first frame.
  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    // Centre of the first slide to centre of the last — the exact travel,
    // whether or not the track is currently a scroll container.
    const measure = () => {
      const slides = track.children;
      const first = slides[0] as HTMLElement | undefined;
      const lastSlide = slides[slides.length - 1] as HTMLElement | undefined;
      if (!first || !lastSlide) return;
      const travel =
        lastSlide.offsetLeft + lastSlide.offsetWidth / 2 -
        (first.offsetLeft + first.offsetWidth / 2);
      root.style.setProperty("--distance", `${Math.max(0, travel)}px`);
    };

    measure();
    // Slides resize when the scene switches on (they size to the stage
    // height when pinned) and whenever the viewport changes.
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    for (const slide of Array.from(track.children)) observer.observe(slide);
    return () => observer.disconnect();
  }, [items.length]);

  useScrollProgress(rootRef, {
    range: "pin",
    onProgress: (progress) => setActive(Math.round(progress * last)),
  });

  // Native mode: which slide is centred is a function of the track's scroll
  // position. (An IntersectionObserver reports every mostly-visible slide,
  // which on a wide viewport is three at once.)
  useEffect(() => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      if (isPinned(root)) return;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let smallest = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const slide = child as HTMLElement;
        const distance = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - centre);
        if (distance < smallest) {
          smallest = distance;
          closest = index;
        }
      });

      setActive(closest);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    track.addEventListener("scroll", schedule, { passive: true });
    return () => {
      track.removeEventListener("scroll", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items.length]);

  const goTo = (index: number) => {
    const root = rootRef.current;
    const track = trackRef.current;
    if (!root || !track) return;

    const target = Math.min(last, Math.max(0, index));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";

    if (isPinned(root)) {
      // Scroll the page to the point where this screen is centred.
      const travel = root.offsetHeight - window.innerHeight;
      const top = root.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (target / last) * travel, behavior });
      return;
    }

    const slide = track.children[target] as HTMLElement | undefined;
    if (!slide) return;
    track.scrollTo({
      left: slide.offsetLeft - (track.clientWidth - slide.clientWidth) / 2,
      behavior,
    });
  };

  return (
    <div ref={rootRef} className={cn(styles.scene, className)}>
      <div className={styles.stage}>
        {header}

        <div
          role="group"
          aria-roledescription="carousel"
          aria-label={labels.carousel}
          className="relative mt-12 sm:mt-14"
        >
          <div className={styles.window}>
            <ul
              ref={trackRef}
              // Focusable so arrow keys scroll it in native mode.
              tabIndex={0}
              className={cn(
                styles.track,
                "no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto sm:gap-8",
                "px-[calc(50%-6.5rem)] py-2 sm:px-[calc(50%-9rem)]",
              )}
            >
              {items.map((item, index) => (
                <li
                  key={item.key}
                  aria-roledescription="slide"
                  className={cn(styles.slide, "w-52 shrink-0 snap-center sm:w-72")}
                >
                  <div
                    className={cn(
                      "transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
                      index === active ? "opacity-100" : "opacity-45 sm:scale-[0.94]",
                    )}
                  >
                    {item.node}
                  </div>
                  <p className="mt-5 text-center text-sm text-ink-faint">{item.caption}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <CarouselButton
              label={labels.previous}
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
              direction="prev"
            />

            <ul className="flex items-center gap-2">
              {items.map((item, index) => (
                <li key={item.key}>
                  <button
                    type="button"
                    aria-label={item.goToLabel}
                    aria-current={index === active}
                    onClick={() => goTo(index)}
                    className="group grid size-6 place-items-center"
                  >
                    <span
                      className={cn(
                        "block size-1.5 rounded-full transition-[background-color,transform] duration-300",
                        index === active
                          ? "scale-125 bg-ink"
                          : "bg-white/25 group-hover:bg-white/50",
                      )}
                    />
                  </button>
                </li>
              ))}
            </ul>

            <CarouselButton
              label={labels.next}
              disabled={active === last}
              onClick={() => goTo(active + 1)}
              direction="next"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface CarouselButtonProps {
  label: string;
  disabled: boolean;
  direction: "prev" | "next";
  onClick: () => void;
}

const CarouselButton = ({ label, disabled, direction, onClick }: CarouselButtonProps) => (
  <button
    type="button"
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      "grid size-10 place-items-center rounded-full border border-hairline-strong",
      "transition-[background-color,border-color,opacity] duration-200",
      disabled ? "opacity-30" : "hover:border-ink-faint hover:bg-white/5",
    )}
  >
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("size-4", direction === "prev" && "rotate-180")}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M8.5 3.5 13 8l-4.5 4.5" />
    </svg>
  </button>
);
