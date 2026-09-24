"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";

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
  labels: {
    carousel: string;
    previous: string;
    next: string;
  };
  className?: string;
}

/**
 * Horizontal screenshot carousel.
 *
 * The track is a native scroll-snap scroller: it works with a trackpad, a
 * touch swipe, the keyboard and with JavaScript disabled. The controls are a
 * convenience layered on top — they move the same scroll position, so there is
 * only ever one source of truth for which screen is showing.
 */
export const ScreenshotCarousel = ({
  items,
  labels,
  className,
}: ScreenshotCarouselProps) => {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  // Which slide is centred is a function of scroll position, so read it from
  // there. An IntersectionObserver reports every slide that is mostly visible,
  // which on a wide viewport is three of them at once.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;

    const measure = () => {
      frame = 0;
      const centre = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let smallest = Number.POSITIVE_INFINITY;

      Array.from(track.children).forEach((child, index) => {
        const slide = child as HTMLElement;
        const distance = Math.abs(
          slide.offsetLeft + slide.clientWidth / 2 - centre,
        );
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
    window.addEventListener("resize", schedule);
    measure();

    return () => {
      track.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items.length]);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;

    const item = track.children[index] as HTMLElement | undefined;
    if (!item) return;

    const offset =
      item.offsetLeft - (track.clientWidth - item.clientWidth) / 2;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: offset, behavior: reduced ? "auto" : "smooth" });
  }, []);

  const atStart = active === 0;
  const atEnd = active === items.length - 1;

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label={labels.carousel}
      className={cn("relative", className)}
    >
      <ul
        ref={trackRef}
        // `tabIndex` makes the overflow region reachable so arrow keys can
        // scroll it — a keyboard user is never forced through the buttons.
        tabIndex={0}
        className={cn(
          "no-scrollbar mask-fade-x flex snap-x snap-mandatory gap-5 overflow-x-auto sm:gap-8",
          "px-[calc(50%-6.5rem)] py-2 sm:px-[calc(50%-9rem)]",
        )}
      >
        {items.map((item, index) => (
          <li
            key={item.key}
            data-index={index}
            aria-roledescription="slide"
            className="w-52 shrink-0 snap-center sm:w-72"
          >
            <div
              className={cn(
                "transition-[opacity,transform] duration-500 ease-[var(--ease-out-soft)]",
                index === active
                  ? "opacity-100"
                  : "opacity-45 sm:scale-[0.94]",
              )}
            >
              {item.node}
            </div>
            <p className="mt-5 text-center text-sm text-ink-faint">
              {item.caption}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-center gap-4">
        <CarouselButton
          label={labels.previous}
          disabled={atStart}
          onClick={() => scrollToIndex(active - 1)}
          direction="prev"
        />

        <ul className="flex items-center gap-2">
          {items.map((item, index) => (
            <li key={item.key}>
              <button
                type="button"
                aria-label={item.goToLabel}
                aria-current={index === active}
                onClick={() => scrollToIndex(index)}
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
          disabled={atEnd}
          onClick={() => scrollToIndex(active + 1)}
          direction="next"
        />
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

const CarouselButton = ({
  label,
  disabled,
  direction,
  onClick,
}: CarouselButtonProps) => (
  <button
    type="button"
    aria-label={label}
    disabled={disabled}
    onClick={onClick}
    className={cn(
      "grid size-10 place-items-center rounded-full border border-hairline-strong",
      "transition-[background-color,border-color,opacity] duration-200",
      disabled
        ? "opacity-30"
        : "hover:border-ink-faint hover:bg-white/5",
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
