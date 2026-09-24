import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

import styles from "./waveform.module.css";

interface WaveformProps {
  /**
   * `live` — bars idle like a signal being recorded.
   * `progress` — bars light up with the enclosing scroll scene's `--p`.
   */
  variant: "live" | "progress";
  bars?: number;
  className?: string;
}

/**
 * Bar heights for a speech-like envelope: a few overlapping sines, so the
 * shape is organic but identical on server and client (no randomness, no
 * hydration mismatch). Values are 0.18 – 1.
 */
const envelope = (count: number): number[] =>
  Array.from({ length: count }, (_, i) => {
    const t = i / Math.max(1, count - 1);
    const swell = Math.sin(Math.PI * t); // quiet at the edges
    const syllables = Math.abs(Math.sin(i * 0.82) * 0.6 + Math.sin(i * 0.31) * 0.4);
    return Math.round((0.18 + 0.82 * swell * (0.35 + 0.65 * syllables)) * 1000) / 1000;
  });

/** The Wave motif: the logo's waveform, as an ornament. Always decorative. */
export const Waveform = ({ variant, bars = 48, className }: WaveformProps) => (
  <div
    aria-hidden="true"
    className={cn(styles.wave, styles[variant], className)}
    style={{ "--n": bars } as CSSProperties}
  >
    {envelope(bars).map((height, index) => (
      <span
        key={index}
        className={styles.bar}
        style={{ "--h": height, "--i": index } as CSSProperties}
      />
    ))}
  </div>
);
