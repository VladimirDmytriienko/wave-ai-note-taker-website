import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

const widths = {
  narrow: "max-w-2xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
} as const;

interface ContainerProps {
  children: ReactNode;
  /** Measure of the content column. `narrow` is the reading width for prose. */
  width?: keyof typeof widths;
  className?: string;
}

export const Container = ({
  children,
  width = "default",
  className,
}: ContainerProps) => (
  <div className={cn("mx-auto w-full px-6 sm:px-8", widths[width], className)}>
    {children}
  </div>
);
