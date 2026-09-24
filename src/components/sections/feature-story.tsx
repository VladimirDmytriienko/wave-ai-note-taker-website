import { ScrollScene } from "@/components/motion/scroll-scene";
import { Waveform } from "@/components/motion/waveform";
import { DeviceFrame } from "@/components/product/device-frame";
import { ScreenshotScreen } from "@/components/product/screenshot";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { ScreenshotId } from "@/config/screenshots";
import { getTranslations, type MessageKey } from "@/i18n";
import { cn } from "@/lib/cn";

import styles from "./feature-story.module.css";

interface Step {
  screenshot: ScreenshotId;
  eyebrow: MessageKey;
  title: MessageKey;
  body: MessageKey;
}

const steps: readonly Step[] = [
  {
    screenshot: "recording",
    eyebrow: "Record",
    title: "One tap, from anywhere.",
    body: "The record button follows you through the app. Pause, resume and drop a marker while you are still talking.",
  },
  {
    screenshot: "transcript",
    eyebrow: "Transcript",
    title: "Read it back, line by line.",
    body: "Transcribe a recording on your device, then tap any line to jump to that moment — or edit it in place.",
  },
  {
    screenshot: "playback",
    eyebrow: "Playback",
    title: "Any moment, any speed.",
    body: "Scrub to any moment, skip back fifteen seconds, or speed up to 1.5× and 2×.",
  },
];

/**
 * The phone stays; the story moves past it. Scrolling through the section
 * steps through Record → Transcript → Playback in place, with the matching
 * screen cross-fading inside one device and a waveform filling like a
 * playhead as the reader goes.
 *
 * Content switching is not movement, so this scene also runs under reduced
 * motion — the global rule makes its transitions instant.
 */
export const FeatureStory = async () => {
  const t = await getTranslations();

  return (
    <ScrollScene
      range="pin"
      steps={steps.length}
      skipOnReducedMotion={false}
      className={styles.scene}
    >
      <section className={styles.stage} aria-labelledby="story-heading">
        <h2 id="story-heading" className="sr-only">
          {t("How Wave works")}
        </h2>

        <Container className={styles.grid}>
          <div className={styles.deviceColumn}>
            <div className={styles.device}>
              <DeviceFrame>
                <div className={styles.screenStack}>
                  {steps.map((step, index) => (
                    <div
                      key={step.screenshot}
                      data-step-item={index}
                      className={cn(styles.screen, "h-full w-full")}
                    >
                      <ScreenshotScreen
                        id={step.screenshot}
                        sizes="(min-width: 1024px) 21rem, 60vw"
                      />
                    </div>
                  ))}
                </div>
              </DeviceFrame>
            </div>
          </div>

          <div>
            <ol className={styles.steps}>
              {steps.map((step, index) => (
                <li key={step.screenshot} data-step-item={index} className={styles.step}>
                  <Eyebrow>{t(step.eyebrow)}</Eyebrow>
                  <h3 className="text-title mt-4">{t(step.title)}</h3>
                  <p className="text-lead mt-4 max-w-md text-ink-muted">{t(step.body)}</p>
                </li>
              ))}
            </ol>

            <div className={styles.meter}>
              <Waveform variant="progress" bars={40} />
            </div>
          </div>
        </Container>
      </section>
    </ScrollScene>
  );
};
