import {
  ScreenshotCarousel,
  type CarouselItem,
} from "@/components/product/screenshot-carousel";
import { Screenshot } from "@/components/product/screenshot";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { screenshots, type ScreenshotId } from "@/config/screenshots";
import { getTranslations } from "@/i18n";

const order: readonly ScreenshotId[] = [
  "library",
  "recording",
  "transcript",
  "playback",
  "folders",
  "settings",
];

/**
 * Every screen, in one pass.
 *
 * The slides are rendered here on the server and handed to the client
 * carousel as nodes, so the message catalog and the image markup never reach
 * the browser bundle — the client half only moves a scroll position.
 */
export const ScreensCarousel = async () => {
  const t = await getTranslations();

  const items: CarouselItem[] = await Promise.all(
    order.map(async (id, index) => ({
      key: id,
      caption: t(screenshots[id].alt),
      goToLabel: t("Go to screen {number} of {total}", {
        number: index + 1,
        total: order.length,
      }),
      node: <Screenshot id={id} sizes="(min-width: 640px) 18rem, 13rem" />,
    })),
  );

  return (
    <Section id="screens" divider aria-labelledby="screens-heading">
      <Container width="wide">
        <Reveal className="text-center">
          <Eyebrow>{t("Screens")}</Eyebrow>
          <h2 id="screens-heading" className="text-title mt-5">
            {t("A closer look.")}
          </h2>
        </Reveal>
      </Container>

      <div className="mt-14">
        <ScreenshotCarousel
          items={items}
          labels={{
            carousel: t("Screenshot carousel"),
            previous: t("Previous screen"),
            next: t("Next screen"),
          }}
        />
      </div>
    </Section>
  );
};
