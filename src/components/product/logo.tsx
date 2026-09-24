import Image from "next/image";

import mark from "@/assets/brand/wave-mark.png";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Hide the wordmark and show the mark alone. */
  markOnly?: boolean;
  className?: string;
}

/**
 * The Wave mark beside the wordmark.
 *
 * The mark is the app's own artwork — the transparent, dark-appearance launch
 * logo (`assets/images/wave-splash-dark.png` in the iOS project), trimmed of
 * its padding and otherwise unmodified. It is decorative next to the visible
 * wordmark, so it carries empty alt text; with `markOnly` the name moves to
 * the image instead.
 *
 * Sized by the surrounding font size (`1.35em`), so it scales with the type.
 */
export const Logo = ({ markOnly = false, className }: LogoProps) => (
  <span className={cn("inline-flex items-center gap-2 text-white", className)}>
    <Image
      src={mark}
      alt={markOnly ? site.appName : ""}
      className="h-[1.35em] w-auto"
      sizes="64px"
      priority
    />
    {markOnly ? null : (
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
        {site.appName}
      </span>
    )}
  </span>
);
