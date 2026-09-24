"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealElement = "div" | "li" | "section" | "figure";

interface RevealProps {
  children: ReactNode;
  /** Element to render, so the reveal never breaks list or figure semantics. */
  as?: RevealElement;
  /** Stagger, in milliseconds. */
  delay?: number;
  /** Distance travelled on entry, in rem. */
  shift?: number;
  className?: string;
}

/**
 * Fade-and-rise on first entry into the viewport.
 *
 * The animation itself is CSS (see `[data-reveal]` in `globals.css`); this
 * component only flips a data attribute once, then stops observing. That keeps
 * the client bundle tiny and lets `prefers-reduced-motion` be handled in a
 * single media query rather than in JavaScript state.
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  delay = 0,
  shift = 1.5,
  className,
}: RevealProps) => {
  // A callback ref, so the observer is attached the moment the node exists and
  // detached when it is swapped out — no ref object is read during render.
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      // Fire a touch before the element is fully in view, so the motion reads
      // as part of the scroll rather than as a reaction to it.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node]);

  return (
    <Tag
      ref={setNode}
      data-reveal=""
      data-visible={visible ? "true" : "false"}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-shift": `${shift}rem`,
        } as CSSProperties
      }
      className={cn(className)}
    >
      {children}
    </Tag>
  );
};
