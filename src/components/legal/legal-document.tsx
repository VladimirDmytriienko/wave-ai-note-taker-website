import type { LegalDocument as LegalDocumentData } from "@/content/legal-types";
import { defaultLocale, localeTags } from "@/i18n/config";
import { getTranslations } from "@/i18n";

interface LegalDocumentProps {
  document: LegalDocumentData;
}

const formatDate = (iso: string): string =>
  new Intl.DateTimeFormat(localeTags[defaultLocale], {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));

/**
 * Renderer shared by every legal page.
 *
 * Content arrives as data from `src/content/<locale>/`, so editing a policy
 * never means editing a component. `todo` blocks render as a visible marker —
 * an unfinished clause must look unfinished.
 */
export const LegalDocumentView = async ({ document }: LegalDocumentProps) => {
  const t = await getTranslations();

  return (
    <article>
      <header className="max-w-3xl">
        <h1 className="text-display">{document.title}</h1>
        <p className="mt-5 text-sm text-ink-faint">
          {t("Last updated {date}", { date: formatDate(document.updated) })}
        </p>
        <div className="mt-8 space-y-4 text-lead text-ink-muted">
          {document.intro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {document.reviewRequired ? (
          <p className="mt-8 rounded-xl border border-dashed border-amber-400/40 bg-amber-400/5 px-5 py-4 text-sm text-amber-200/80">
            <span className="font-medium">{t("Needs review")} — </span>
            This document is a working draft. It must be completed and reviewed
            by a qualified lawyer before the site is published.
          </p>
        ) : null}
      </header>

      <div className="mt-16 space-y-12">
        {document.sections.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="text-xl font-semibold tracking-[-0.02em]">
              {section.heading}
            </h2>

            <div className="mt-4 max-w-3xl space-y-4 text-ink-muted">
              {section.blocks.map((block, index) => {
                if (block.type === "paragraph") {
                  return <p key={index}>{block.text}</p>;
                }

                if (block.type === "list") {
                  return (
                    <ul key={index} className="space-y-2 pl-5">
                      {block.items.map((item) => (
                        <li key={item} className="list-disc marker:text-ink-faint">
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={index}
                    className="rounded-xl border border-dashed border-hairline-strong px-5 py-4 text-sm text-ink-faint"
                  >
                    <span className="font-medium text-amber-200/80">
                      {t("Needs review")}:{" "}
                    </span>
                    {block.text}
                  </p>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
};
