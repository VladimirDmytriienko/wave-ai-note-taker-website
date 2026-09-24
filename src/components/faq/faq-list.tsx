import type { FaqEntry } from "@/content/en/faq";
import { cn } from "@/lib/cn";

interface FaqListProps {
  entries: readonly FaqEntry[];
  className?: string;
}

/**
 * Question list built on native `<details>`.
 *
 * Disclosure, keyboard support and screen-reader semantics come from the
 * platform, so this ships no client JavaScript — the only scripted behaviour a
 * hand-rolled accordion would add is the animation, which CSS already covers.
 */
export const FaqList = ({ entries, className }: FaqListProps) => (
  <ul className={cn("divide-y divide-hairline border-y border-hairline", className)}>
    {entries.map((entry) => (
      <li key={entry.id} id={entry.id} className="scroll-mt-28">
        <details className="group">
          <summary
            className={cn(
              "flex cursor-pointer list-none items-start justify-between gap-6 py-6",
              "text-lg font-medium tracking-[-0.015em] transition-colors duration-200",
              "hover:text-ink-muted [&::-webkit-details-marker]:hidden",
            )}
          >
            {entry.question}
            <span
              aria-hidden="true"
              className="mt-1 grid size-6 shrink-0 place-items-center rounded-full border border-hairline-strong transition-transform duration-300 ease-[var(--ease-out-soft)] group-open:rotate-45"
            >
              <svg
                viewBox="0 0 16 16"
                className="size-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              >
                <path d="M8 3v10M3 8h10" />
              </svg>
            </span>
          </summary>

          <div className="disclosure-panel max-w-2xl space-y-3 pb-7 text-ink-muted">
            {entry.answer.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </details>
      </li>
    ))}
  </ul>
);
