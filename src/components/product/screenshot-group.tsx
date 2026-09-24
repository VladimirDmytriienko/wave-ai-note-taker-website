import { ScrollScene } from "@/components/motion/scroll-scene";
import { Waveform } from "@/components/motion/waveform";
import { Reveal } from "@/components/ui/reveal";
import type { ScreenshotId } from "@/config/screenshots";
import { cn } from "@/lib/cn";

import { Screenshot } from "./screenshot";
import styles from "./screenshot-group.module.css";

interface ScreenshotGroupProps {
  /** Left, centre, right. The centre screen is the one in focus. */
  ids: readonly [ScreenshotId, ScreenshotId, ScreenshotId];
  className?: string;
}

/**
 * Hero composition: a single phone that opens into three as the page starts
 * to scroll — the flanking screens slide out from behind it and tilt away.
 *
 * Motion lives in `screenshot-group.module.css`, driven by `--p`; this file is
 * a Server Component and only lays out the stage.
 */
export const ScreenshotGroup = ({ ids, className }: ScreenshotGroupProps) => {
  const [left, centre, right] = ids;

  return (
    <ScrollScene
      range="hero"
      className={cn(styles.scene, "relative mx-auto w-full max-w-4xl", className)}
    >
      <div
        aria-hidden="true"
        className="glow-accent pointer-events-none absolute inset-x-[-20%] inset-y-[-12%]"
      />
      <div className={styles.wave}>
        <Waveform variant="live" bars={72} />
      </div>

      <div className={styles.row}>
        <Reveal on="load" delay={880} shift={1} className={styles.slotSide}>
          <div className={cn(styles.phone, styles.left)}>
            <Screenshot id={left} sizes="(min-width: 640px) 18rem, 30vw" />
            <div aria-hidden="true" className={styles.dim} />
          </div>
        </Reveal>

        <Reveal on="load" delay={760} shift={1.75} className={styles.slotCentre}>
          <div className={cn(styles.phone, styles.centre)}>
            <Screenshot id={centre} priority sizes="(min-width: 640px) 24rem, 45vw" />
          </div>
        </Reveal>

        <Reveal on="load" delay={880} shift={1} className={styles.slotSide}>
          <div className={cn(styles.phone, styles.right)}>
            <Screenshot id={right} sizes="(min-width: 640px) 18rem, 30vw" />
            <div aria-hidden="true" className={styles.dim} />
          </div>
        </Reveal>
      </div>
    </ScrollScene>
  );
};
