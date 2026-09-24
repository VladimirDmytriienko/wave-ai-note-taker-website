import type { Metadata } from "next";

import { LegalDocumentView } from "@/components/legal/legal-document";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { terms } from "@/content/en/terms";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: terms.title,
  description: terms.description,
  path: "/terms",
});

const TermsPage = () => (
  <Section space="tight" className="pt-20 sm:pt-24">
    <Container>
      <LegalDocumentView document={terms} />
    </Container>
  </Section>
);

export default TermsPage;
