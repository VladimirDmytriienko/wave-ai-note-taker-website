import { cn } from "@/lib/cn";

interface ScreenshotPlaceholderProps {
  /** Which screen is missing, in the reader's language. */
  screen: string;
  /** Short note describing the capture to supply. Development aid, not copy. */
  capture?: string;
  className?: string;
}

/**
 * Stand-in for a screenshot that has not been supplied yet.
 *
 * Deliberately abstract: it must never be mistaken for the product's real UI.
 * It occupies the exact footprint of the finished asset so the composition can
 * be designed and reviewed before the captures exist.
 */
export const ScreenshotPlaceholder = ({
  screen,
  capture,
  className,
}: ScreenshotPlaceholderProps) => (
  <div
    className={cn(
      "flex h-full w-full flex-col items-center justify-center gap-3 p-[8%] text-center",
      "bg-[radial-gradient(120%_80%_at_50%_0%,#191c22_0%,#0a0b0e_70%)]",
      className,
    )}
  >
    <div
      aria-hidden="true"
      className="flex w-full flex-1 items-center justify-center rounded-[6%] border border-dashed border-white/15"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-[14%] min-w-6 text-white/20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="4" />
        <path d="m3 16 4.5-4.5a2 2 0 0 1 2.8 0L15 16" />
        <path d="m14 14 1.8-1.8a2 2 0 0 1 2.8 0L21 14.6" />
        <circle cx="15" cy="8.5" r="1.4" />
      </svg>
    </div>
    <p className="text-[clamp(0.6rem,3.2cqw,0.9rem)] font-medium text-white/55">
      {screen}
    </p>
    {capture ? (
      <p className="text-[clamp(0.5rem,2.6cqw,0.75rem)] leading-snug text-white/30">
        {capture}
      </p>
    ) : null}
  </div>
);
