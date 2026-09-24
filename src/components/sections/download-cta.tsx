import { AppStoreButton } from "@/components/product/app-store-button";
import { Logo } from "@/components/product/logo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { site } from "@/config/site";
import { getTranslations } from "@/i18n";

export const DownloadCta = async () => {
  const t = await getTranslations();

  return (
    <Section id="download" space="loose" divider aria-labelledby="download-heading">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] glow-bottom"
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Logo markOnly className="text-[3.25rem]" />
          <h2 id="download-heading" className="text-display mt-8">
            {t("Start with your next thought.")}
          </h2>
          <p className="text-lead mx-auto mt-6 max-w-md text-ink-muted">
            {t("Wave is built for iPhone and iPad and runs entirely on your device.")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <AppStoreButton size="lg" />
            <p className="text-sm text-ink-faint">
              {t("iPhone and iPad · iOS {version} or later", {
                version: site.platform.minimumOsVersion,
              })}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
};
