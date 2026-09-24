import { ScrollScene } from "@/components/motion/scroll-scene";
import { DeviceFrame } from "@/components/product/device-frame";
import { ScreenshotScreen } from "@/components/product/screenshot";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { aspectOf, getScreenshot } from "@/config/screenshots";
import { getTranslations } from "@/i18n";
import { cn } from "@/lib/cn";

import styles from "./ipad-showcase.module.css";

/**
 * Wave on iPad: the library beside a transcript, large. As the device passes
 * the middle of the screen it switches from the dark appearance to the light
 * one — the two captures are the same screen, so it reads as the iPad itself
 * changing appearance.
 */
export const IpadShowcase = async () => {
  const t = await getTranslations();
  const aspect = aspectOf(getScreenshot("ipad-split"));

  return (
    <Section id="ipad" divider aria-labelledby="ipad-heading">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Eyebrow>{t("iPad")}</Eyebrow>
          <h2 id="ipad-heading" className="text-title mt-5">
            {t("Room to spread out.")}
          </h2>
          <p className="text-lead mx-auto mt-5 max-w-xl text-ink-muted">
            {t(
              "On iPad, your recordings sit beside the transcript — in light or dark, following your device.",
            )}
          </p>
        </Reveal>
      </Container>

      <ScrollScene range="view" className={cn(styles.scene, "mt-14 sm:mt-20")}>
        <Container width="wide">
          <div className={styles.device}>
            <DeviceFrame device="ipad" aspect={aspect}>
              <div className={styles.layer}>
                <ScreenshotScreen id="ipad-split" sizes="(min-width: 1100px) 64rem, 92vw" />
              </div>
              <div className={cn(styles.layer, styles.light)}>
                <ScreenshotScreen
                  id="ipad-split-light"
                  sizes="(min-width: 1100px) 64rem, 92vw"
                />
              </div>
            </DeviceFrame>
          </div>

          <p aria-hidden="true" className={styles.readout}>
            <span className={styles.readoutDark}>{t("Dark")}</span>
            <span className={styles.readoutLight}>{t("Light")}</span>
          </p>
        </Container>
      </ScrollScene>
    </Section>
  );
};
