import { AppStoreButton } from "@/components/product/app-store-button";
import { ScreenshotGroup } from "@/components/product/screenshot-group";
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
        className="pointer-events-none absolute inset-x-0 top-0 h-[42rem] bg-[radial-gradient(60%_50%_at_50%_-10%,rgba(61,155,255,0.16),transparent_70%)]"
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal on="load">
            <Eyebrow>{t("Voice notes for iPhone")}</Eyebrow>
          </Reveal>

          <Reveal on="load" delay={80}>
            <h1 className="text-display-xl mt-4 sm:mt-5">
              {t("Voice notes that never leave your iPhone.")}
            </h1>
          </Reveal>

          <Reveal on="load" delay={160}>
            <p className="text-lead mx-auto mt-4 max-w-xl text-ink-muted sm:mt-5">
              {t(
                "Wave records, transcribes and searches your notes on your device. No account, nothing uploaded.",
              )}
            </p>
          </Reveal>

          <Reveal on="load" delay={240}>
            <div className="mt-7 flex flex-col items-center gap-3 sm:mt-8 sm:gap-3.5">
              <AppStoreButton size="lg" />
              <p className="text-sm text-ink-faint">
                {t("iPhone · iOS {version} or later", {
                  version: site.platform.minimumOsVersion,
                })}
              </p>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 sm:mt-14">
          <ScreenshotGroup ids={["recording", "library", "transcript"]} />
        </div>
      </Container>
    </section>
  );
};
