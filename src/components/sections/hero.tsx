import { AppStoreButton } from "@/components/product/app-store-button";
import { ScreenshotGroup } from "@/components/product/screenshot-group";
import { SplitWords } from "@/components/motion/split-words";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/config/site";
import { getTranslations } from "@/i18n";

export const Hero = async () => {
  const t = await getTranslations();

  return (
    <section className="relative overflow-hidden pt-8 pb-14 sm:pt-16 sm:pb-20">
      {/* Ambient light from above — sets the stage without competing with the
          product visual below it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] glow-top"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal on="load">
            <Eyebrow>{t("Voice notes for iPhone and iPad")}</Eyebrow>
          </Reveal>

          <h1 className="text-display-xl mt-4 sm:mt-5">
            <SplitWords
              text={t("Voice notes that never leave your iPhone.")}
              delay={120}
            />
          </h1>

          <Reveal on="load" delay={560}>
            <p className="text-lead mx-auto mt-4 max-w-xl text-ink-muted sm:mt-5">
              {t(
                "Wave records, transcribes and searches your notes on your device. No account, nothing uploaded.",
              )}
            </p>
          </Reveal>

          <Reveal on="load" delay={680}>
            <div className="mt-7 flex flex-col items-center gap-3 sm:mt-8 sm:gap-3.5">
              <AppStoreButton size="lg" />
              <p className="text-sm text-ink-faint">
                {t("iPhone and iPad · iOS {version} or later", {
                  version: site.platform.minimumOsVersion,
                })}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 sm:mt-14">
          <ScreenshotGroup ids={["library", "playback", "transcript"]} />
        </div>
      </Container>
    </section>
  );
};
