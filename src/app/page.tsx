import { DownloadCta } from "@/components/sections/download-cta";
import { FaqPreview } from "@/components/sections/faq-preview";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { Hero } from "@/components/sections/hero";
import { ScreensCarousel } from "@/components/sections/screens-carousel";
import { Showcase } from "@/components/sections/showcase";
import { absoluteUrl, site } from "@/config/site";

/**
 * Home page — composition only.
 *
 * Each block is a self-contained section component; the page's job is the
 * order they appear in and nothing else.
 */
const HomePage = () => {
  // Structured data: the product itself. Keep it to facts the page states.
  const applicationSchema = {
    "@context": "https://schema.org",
    "@type": "MobileApplication",
    name: site.appName,
    applicationCategory: "ProductivityApplication",
    operatingSystem: `iOS ${site.platform.minimumOsVersion}+`,
    url: absoluteUrl("/"),
    ...(site.appStore.url ? { installUrl: site.appStore.url } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Serialised, not user input — no interpolation reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(applicationSchema) }}
      />

      <Hero />
      <FeatureGrid />

      <Showcase
        screenshot="recording"
        eyebrow="Record"
        title="One tap, from anywhere."
        body="The record button follows you through the app. Pause, resume and drop a marker while you are still talking."
        divider
      />

      <Showcase
        screenshot="transcript"
        eyebrow="Transcript"
        title="Read it back, line by line."
        body="Transcribe a recording on your device, then tap any line to jump to that moment — or edit it in place."
        side="end"
      />

      <ScreensCarousel />
      <FaqPreview />
      <DownloadCta />
    </>
  );
};

export default HomePage;
