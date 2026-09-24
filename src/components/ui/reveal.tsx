"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

import { cn } from "@/lib/cn";

type RevealElement = "div" | "li" | "section" | "figure";

interface RevealProps {
  children: ReactNode;
  /** Element to render, so the reveal never breaks list or figure semantics. */
  as?: RevealElement;
  /**
   * `scroll` (default) — rises in when it first scrolls into view.
   * `load` — rises in once on page load; for content above the fold.
   */
  on?: "scroll" | "load";
  /** Stagger, in milliseconds. */
  delay?: number;
  /** Distance travelled on entry, in rem. */
  shift?: number;
  className?: string;
}

/**
 * Fade-and-rise entrance.
 *
 * Content is ALWAYS visible in the server-rendered HTML. Motion is layered on
 * top and can only ever be skipped, never leave content hidden:
 *
 * - `load` is a plain CSS animation, so it runs from the HTML alone.
 * - `scroll` hides an element only after this component has mounted AND found
 *   it below the viewport — i.e. only once JavaScript is proven to be running
 *   and the element is off screen. If scripts fail to load (blocked, slow,
 *   erroring), nothing is ever hidden.
 *
 * The state lives in a data attribute written straight to the DOM rather than
 * in React state: it is purely presentational, and React never renders it, so
 * hydration and re-renders cannot fight over it.
 */
export const Reveal = ({
  children,
  as: Tag = "div",
  on = "scroll",
  delay = 0,
  shift = 1.5,
  className,
}: RevealProps) => {
  const nodeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (on !== "scroll" || !node) return;

    // Already on screen (or above it, after a scroll restore): leave it be.
    if (node.getBoundingClientRect().top < window.innerHeight) return;

    node.dataset.state = "hidden";

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        node.dataset.state = "shown";
        observer.disconnect();
      },
      // Fire a touch before the element is fully in view, so the motion reads
      // as part of the scroll rather than as a reaction to it.
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      // Never strand content hidden if the component unmounts mid-flight.
      delete node.dataset.state;
    };
  }, [on]);

  return (
    <Tag
      ref={(element: HTMLElement | null) => {
        nodeRef.current = element;
      }}
      data-reveal={on}
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
