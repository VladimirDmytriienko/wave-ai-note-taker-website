import { hasAppStoreLink, site } from "@/config/site";
import { getTranslations } from "@/i18n";
import { cn } from "@/lib/cn";

interface AppStoreButtonProps {
  size?: "md" | "lg";
  className?: string;
}

const sizes = {
  md: "h-12 px-6 text-[0.9375rem]",
  lg: "h-14 px-8 text-base",
} as const;

const AppleGlyph = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[1.15em]" fill="currentColor">
    <path d="M16.36 12.73c-.02-2.3 1.88-3.4 1.96-3.45-1.07-1.56-2.73-1.78-3.32-1.8-1.42-.14-2.76.83-3.48.83-.71 0-1.82-.81-2.99-.79-1.54.02-2.96.89-3.75 2.27-1.6 2.77-.41 6.87 1.15 9.12.76 1.1 1.67 2.33 2.86 2.29 1.15-.05 1.58-.74 2.97-.74s1.78.74 2.99.72c1.24-.02 2.02-1.12 2.78-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.42-3.64ZM14.07 5.98c.63-.77 1.06-1.83.94-2.89-.91.04-2.01.6-2.66 1.37-.59.68-1.1 1.77-.96 2.81 1.01.08 2.05-.51 2.68-1.29Z" />
  </svg>
);

/**
 * Primary download call to action.
 *
 * Until `site.appStore.status` is flipped to `"live"` this renders an honest
 * "coming soon" notice rather than a link to nowhere.
 *
 * TODO (design): replace with Apple's official "Download on the App Store"
 * badge artwork before launch — Apple requires the supplied asset for store
 * links. Drop it in `public/brand/` and swap the inner markup; the states and
 * layout here stay as they are.
 */
export const AppStoreButton = async ({
  size = "md",
  className,
}: AppStoreButtonProps) => {
  const t = await getTranslations();

  if (!hasAppStoreLink()) {
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center gap-2.5 rounded-full",
          "border border-hairline-strong text-ink-muted",
          sizes[size],
          className,
        )}
      >
        <AppleGlyph />
        {t("Coming to the App Store")}
      </span>
    );
  }

  return (
    <a
      href={site.appStore.url as string}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full bg-ink font-medium text-ink-inverse",
        "transition-[transform,background-color] duration-200 ease-[var(--ease-standard)]",
        "hover:bg-white active:scale-[0.98]",
        sizes[size],
        className,
      )}
    >
      <AppleGlyph />
      {t("Download on the App Store")}
    </a>
  );
};
