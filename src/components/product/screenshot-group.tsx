import type { ScreenshotId } from "@/config/screenshots";
import { cn } from "@/lib/cn";

import { Reveal } from "@/components/ui/reveal";

import { Screenshot } from "./screenshot";

interface ScreenshotGroupProps {
  /** Left, centre, right. The centre screen is the one in focus. */
  ids: readonly [ScreenshotId, ScreenshotId, ScreenshotId];
  className?: string;
}

/**
 * Three overlapping devices, centre screen in focus.
 *
 * The flanking screens are decorative context: they are pushed back with
 * scale, rotation and a dimming wash rather than blur, which stays crisp on
 * high-density displays and costs nothing to composite.
 */
export const ScreenshotGroup = ({ ids, className }: ScreenshotGroupProps) => {
  const [left, centre, right] = ids;

  return (
    <div className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <div
        aria-hidden="true"
        className="glow-accent pointer-events-none absolute inset-x-[-20%] inset-y-[-12%]"
      />

      <div className="relative flex items-center justify-center">
        <Reveal
          on="load"
          delay={320}
          shift={1}
          className="relative z-10 w-[30%] -translate-x-[5%] rotate-[-7deg] sm:w-[28%] sm:-translate-x-[12%]"
        >
          <Screenshot id={left} sizes="(min-width: 640px) 18rem, 30vw" />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[13%] bg-canvas/45"
          />
        </Reveal>

        <Reveal on="load" delay={260} shift={1.75} className="relative z-20 w-[40%] sm:w-[38%]">
          <Screenshot id={centre} priority sizes="(min-width: 640px) 24rem, 45vw" />
        </Reveal>

        <Reveal
          on="load"
          delay={380}
          shift={1}
          className="relative z-10 w-[30%] translate-x-[5%] rotate-[7deg] sm:w-[28%] sm:translate-x-[12%]"
        >
          <Screenshot id={right} sizes="(min-width: 640px) 18rem, 30vw" />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[13%] bg-canvas/45"
          />
        </Reveal>
      </div>
    </div>
  );
};
