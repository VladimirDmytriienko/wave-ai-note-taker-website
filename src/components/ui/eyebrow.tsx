import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

/** Small uppercase label that names a section above its heading. */
export const Eyebrow = ({ children, className }: EyebrowProps) => (
  <p className={cn("text-eyebrow text-ink-faint uppercase", className)}>
    {children}
  </p>
);
