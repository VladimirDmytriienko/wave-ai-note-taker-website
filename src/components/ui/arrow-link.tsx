import Link from "next/link";

import { cn } from "@/lib/cn";

interface ArrowLinkProps {
  href: string;
  children: string;
  className?: string;
}

/** Quiet text link with an arrow that nudges on hover. */
export const ArrowLink = ({ href, children, className }: ArrowLinkProps) => (
  <Link
    href={href}
    className={cn(
      "group inline-flex items-center gap-2 text-[0.9375rem] text-ink-muted",
      "transition-colors duration-200 hover:text-ink",
      className,
    )}
  >
    {children}
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-3.5 transition-transform duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  </Link>
);
