import Link from "next/link";

import { Logo } from "@/components/product/logo";
import { Container } from "@/components/ui/container";
import { legalNav, productNav } from "@/config/navigation";
import { site } from "@/config/site";
import { getTranslations, type MessageKey } from "@/i18n";

interface FooterColumnProps {
  title: string;
  items: readonly { label: string; href: string; external?: boolean }[];
}

const FooterColumn = ({ title, items }: FooterColumnProps) => (
  <div>
    <h2 className="text-eyebrow text-ink-faint uppercase">{title}</h2>
    <ul className="mt-4 space-y-2.5">
      {items.map((item) => (
        <li key={item.href}>
          {item.external ? (
            <a
              href={item.href}
              className="text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </a>
          ) : (
            <Link
              href={item.href}
              className="text-[0.9375rem] text-ink-muted transition-colors duration-200 hover:text-ink"
            >
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  </div>
);

export const Footer = async () => {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  const translate = (items: readonly { label: MessageKey; href: string }[]) =>
    items.map((item) => ({ label: t(item.label), href: item.href }));

  // Support links only exist once there is somewhere to send people.
  const supportItems = [
    ...(site.supportEmail
      ? [
          {
            label: site.supportEmail,
            href: `mailto:${site.supportEmail}`,
            external: true,
          },
        ]
      : []),
    ...site.socialLinks.map((link) => ({
      label: link.label,
      href: link.href,
      external: true,
    })),
  ];

  return (
    <footer className="border-t border-hairline">
      <Container width="wide">
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo className="text-[1.375rem]" />
            <p className="mt-4 max-w-xs text-sm text-ink-faint">
              {t(
                "Voice notes for iPhone and iPad. Recorded, transcribed and kept on your device.",
              )}
            </p>
          </div>

          <FooterColumn title={t("Product")} items={translate(productNav)} />
          <FooterColumn title={t("Legal")} items={translate(legalNav)} />
          {supportItems.length > 0 ? (
            <FooterColumn title={t("Support")} items={supportItems} />
          ) : null}
        </div>

        <div className="flex flex-col gap-2 border-t border-hairline py-8 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{t("© {year} Allsaid", { year })}</p>
          <p>{t("iPhone and iPad · iOS {version} or later", { version: site.platform.minimumOsVersion })}</p>
        </div>
      </Container>
    </footer>
  );
};
