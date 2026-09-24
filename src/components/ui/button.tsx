import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium " +
  "transition-[transform,background-color,border-color,color] duration-200 " +
  "ease-[var(--ease-standard)] active:scale-[0.98] whitespace-nowrap";

const variants = {
  primary:
    "bg-ink text-ink-inverse hover:bg-white shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]",
  secondary:
    "border border-hairline-strong text-ink hover:border-ink-faint hover:bg-white/5",
  ghost: "text-ink-muted hover:text-ink",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
} as const;

interface ButtonBaseProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
}

interface ButtonLinkProps extends ButtonBaseProps {
  href: string;
  /** Opens in a new tab and adds the matching rel. */
  external?: boolean;
  "aria-label"?: string;
}

const isAbsolute = (href: string): boolean => /^(https?:|mailto:|tel:)/.test(href);

/** Call-to-action rendered as a link. Internal hrefs go through `next/link`. */
export const ButtonLink = ({
  children,
  href,
  external = false,
  variant = "primary",
  size = "md",
  className,
  ...aria
}: ButtonLinkProps) => {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (isAbsolute(href) || external) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noreferrer noopener" }
          : {})}
        {...aria}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...aria}>
      {children}
    </Link>
  );
};
