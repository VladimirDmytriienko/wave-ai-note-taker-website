import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getTranslations } from "@/i18n";

const NotFound = async () => {
  const t = await getTranslations();

  return (
    <Section space="loose">
      <Container className="text-center">
        <h1 className="text-display">{t("Page not found")}</h1>
        <p className="text-lead mt-6 text-ink-muted">
          {t("The page you were looking for does not exist.")}
        </p>
        <ButtonLink href="/" variant="secondary" className="mt-10">
          {t("Back to home")}
        </ButtonLink>
      </Container>
    </Section>
  );
};

export default NotFound;
