import { Screenshot } from "@/components/product/screenshot";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import type { ScreenshotId } from "@/config/screenshots";
import { getTranslations, type MessageKey } from "@/i18n";
import { cn } from "@/lib/cn";

interface ShowcaseProps {
  screenshot: ScreenshotId;
  eyebrow: MessageKey;
  title: MessageKey;
  body: MessageKey;
  /** Side the device sits on at wide sizes. Alternating reads as a rhythm. */
  side?: "start" | "end";
  divider?: boolean;
}

/**
 * One product screen beside one short idea.
 *
 * Deliberately a single reusable section rather than bespoke markup per
 * feature: the composition stays consistent and adding another screen is one
 * call, not another layout.
 */
export const Showcase = async ({
  screenshot,
  eyebrow,
  title,
  body,
  side = "start",
  divider = false,
}: ShowcaseProps) => {
  const t = await getTranslations();

  return (
    <Section divider={divider}>
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div
            className={cn(
              "relative mx-auto w-full max-w-[17rem] sm:max-w-xs",
              side === "end" && "lg:order-last",
            )}
          >
            <div
              aria-hidden="true"
              className="glow-accent pointer-events-none absolute inset-[-30%]"
            />
            <Reveal shift={2} className="relative">
              <Screenshot
                id={screenshot}
                sizes="(min-width: 1024px) 20rem, (min-width: 640px) 20rem, 70vw"
              />
            </Reveal>
          </div>

          <div className={cn(side === "end" && "lg:order-first")}>
            <Reveal>
              <Eyebrow>{t(eyebrow)}</Eyebrow>
              <h2 className="text-title mt-5">{t(title)}</h2>
              <p className="text-lead mt-5 max-w-md text-ink-muted">{t(body)}</p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
};
