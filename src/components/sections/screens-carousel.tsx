import {
  ScreenshotCarousel,
  type CarouselItem,
} from "@/components/product/screenshot-carousel";
import { Screenshot } from "@/components/product/screenshot";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
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
 * Every screen, in one pass. As the reader scrolls, the row slides sideways.
 *
 * The slides are rendered here on the server and handed to the client
 * carousel as nodes, so the message catalog and the image markup never reach
 * the browser bundle — the client half only moves a position.
 */
export const ScreensCarousel = async () => {
  const t = await getTranslations();

  const items: CarouselItem[] = order.map((id, index) => ({
    key: id,
    caption: t(screenshots[id].alt),
    goToLabel: t("Go to screen {number} of {total}", {
      number: index + 1,
      total: order.length,
    }),
    node: <Screenshot id={id} sizes="(min-width: 640px) 18rem, 13rem" />,
  }));

  return (
    <section
      id="screens"
      aria-labelledby="screens-heading"
      className="relative py-24 sm:py-32"
    >
      <div aria-hidden="true" className="rule-fade absolute inset-x-0 top-0 h-px" />
      <ScreenshotCarousel
        items={items}
        header={
          <Container width="wide" className="text-center">
            <Eyebrow>{t("Screens")}</Eyebrow>
            <h2 id="screens-heading" className="text-title mt-5">
              {t("A closer look.")}
            </h2>
          </Container>
        }
        labels={{
          carousel: t("Screenshot carousel"),
          previous: t("Previous screen"),
          next: t("Next screen"),
        }}
      />
    </section>
  );
};
