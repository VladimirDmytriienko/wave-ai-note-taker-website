import { FaqList } from "@/components/faq/faq-list";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { faqPreview } from "@/content/en/faq";
import { getTranslations } from "@/i18n";

export const FaqPreview = async () => {
  const t = await getTranslations();

  return (
    <Section divider aria-labelledby="faq-preview-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <Eyebrow>{t("Questions")}</Eyebrow>
            <h2 id="faq-preview-heading" className="text-title mt-5">
              {t("Good to know.")}
            </h2>
            <ArrowLink href="/faq" className="mt-7">
              {t("See all questions")}
            </ArrowLink>
          </Reveal>

          <Reveal delay={120}>
            <FaqList entries={faqPreview} />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
};
