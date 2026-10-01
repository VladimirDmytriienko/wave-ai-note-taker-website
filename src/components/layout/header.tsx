import Link from "next/link";

import { Logo } from "@/components/product/logo";
import { Container } from "@/components/ui/container";
import { primaryNav } from "@/config/navigation";
import { getTranslations } from "@/i18n";

/**
 * Sticky site header.
 *
 * No client JavaScript: the translucent material is a permanent backdrop
 * filter rather than a scroll listener, and the in-page anchors that only make
 * sense on a wide layout are simply hidden on small screens, where scrolling
 * is the natural way through the page.
 */
export const Header = async () => {
  const t = await getTranslations();

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/72 backdrop-blur-xl">
      <Container width="wide">
        <div className="flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={t("Allsaid home")}
            className="shrink-0 transition-opacity duration-200 hover:opacity-80"
          >
            <Logo className="text-[1.375rem]" />
          </Link>

          <nav aria-label={t("Overview")} className="flex items-center gap-1">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "rounded-full px-3 py-2 text-sm text-ink-muted transition-colors duration-200 hover:text-ink " +
                  // In-page anchors are wide-layout affordances only.
                  (item.href.startsWith("/#") ? "hidden sm:inline-flex" : "")
                }
              >
                {t(item.label)}
              </Link>
            ))}

            <Link
              href="/#download"
              className="ml-2 inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm font-medium text-ink-inverse transition-[background-color,transform] duration-200 hover:bg-white active:scale-[0.98]"
            >
              {t("Get the app")}
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
};
