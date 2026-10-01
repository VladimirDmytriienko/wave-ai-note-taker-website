import type { Metadata } from "next";

import { FaqList } from "@/components/faq/faq-list";
import { AppStoreButton } from "@/components/product/app-store-button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { publishedFaq } from "@/content/en/faq";
import { getTranslations } from "@/i18n";
import { createMetadata } from "@/lib/metadata";

const description =
  "Short answers about how Allsaid handles your recordings, your data and your device.";

export const metadata: Metadata = createMetadata({
  title: "Frequently asked questions",
  description,
  path: "/faq",
});

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: publishedFaq.map((entry) => ({
    "@type": "Question",
    name: entry.question,
    acceptedAnswer: { "@type": "Answer", text: entry.answer.join(" ") },
  })),
};

const FaqPage = async () => {
  const t = await getTranslations();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Section space="tight" className="pt-20 sm:pt-24">
        <Container>
          <Reveal className="max-w-2xl">
            <h1 className="text-display">{t("Frequently asked questions")}</h1>
            <p className="text-lead mt-6 text-ink-muted">
              {t(
                "Short answers about how Allsaid handles your recordings, your data and your device.",
              )}
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-14 max-w-3xl">
            <FaqList entries={publishedFaq} />
          </Reveal>

          <Reveal delay={160} className="mt-16 flex max-w-3xl justify-center">
            <AppStoreButton />
          </Reveal>
        </Container>
      </Section>
    </>
  );
};

export default FaqPage;
