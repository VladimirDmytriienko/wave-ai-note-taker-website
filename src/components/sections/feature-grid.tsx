import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { getTranslations, type MessageKey } from "@/i18n";

const features: readonly { title: MessageKey; body: MessageKey }[] = [
  {
    title: "On-device transcription",
    body: "Speech becomes text on your iPhone. Recordings are never sent anywhere.",
  },
  {
    title: "No account, ever",
    body: "No sign-in and nothing to set up. Open the app and press record.",
  },
  {
    title: "Find any moment",
    body: "Search across every recording, sort them into folders, keep favourites close.",
  },
  {
    title: "Made for listening back",
    body: "Scrub the waveform, skip fifteen seconds, and play at 1×, 1.5× or 2×.",
  },
];

export const FeatureGrid = async () => {
  const t = await getTranslations();

  return (
    <Section id="features" divider aria-labelledby="features-heading">
      <Container>
        <Reveal>
          <Eyebrow>{t("What Wave does")}</Eyebrow>
        </Reveal>

        {/* The grid itself is the heading's content; a visible title here would
            repeat the eyebrow, so the accessible name carries it instead. */}
        <h2 id="features-heading" className="sr-only">
          {t("What Wave does")}
        </h2>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
          {features.map((feature, index) => (
            <Reveal
              as="li"
              key={feature.title}
              delay={index * 90}
              shift={1}
              className="bg-canvas p-8 sm:p-10"
            >
              <h3 className="text-xl font-medium tracking-[-0.02em]">
                {t(feature.title)}
              </h3>
              <p className="mt-3 max-w-sm text-ink-muted">{t(feature.body)}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
};
