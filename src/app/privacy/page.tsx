import type { Metadata } from "next";

import { LegalDocumentView } from "@/components/legal/legal-document";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { privacy } from "@/content/en/privacy";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: privacy.title,
  description: privacy.description,
  path: "/privacy",
});

const PrivacyPage = () => (
  <Section space="tight" className="pt-20 sm:pt-24">
    <Container>
      <LegalDocumentView document={privacy} />
    </Container>
  </Section>
);

export default PrivacyPage;
