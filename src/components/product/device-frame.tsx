import type { ReactNode } from "react";

import { SCREENSHOT_ASPECT } from "@/config/screenshots";
import { cn } from "@/lib/cn";

interface DeviceFrameProps {
  children: ReactNode;
  /** Draw the Dynamic Island cut-out. Off for cropped or partial compositions. */
  island?: boolean;
  className?: string;
}

/**
 * Generic phone bezel around a screenshot.
 *
 * Sizes are expressed in container query units (`cqw`), so the corner radius,
 * bezel thickness and island scale exactly with whatever width the composition
 * gives the device — a fixed `rem` radius looks wrong the moment the frame is
 * rendered at two different sizes.
 */
export const DeviceFrame = ({
  children,
  island = true,
  className,
}: DeviceFrameProps) => (
  <div className={cn("@container w-full", className)}>
    <div
      className={cn(
        "relative w-full p-[2.6cqw]",
        // Brushed-metal rim: a gradient reads as a machined edge where a flat
        // border reads as a rectangle.
        "bg-[linear-gradient(150deg,#484c55_0%,#14161b_28%,#080a0e_62%,#3b3f47_100%)]",
        "shadow-[0_2cqw_6cqw_-1cqw_rgba(0,0,0,0.85),0_0_0_0.15cqw_rgba(255,255,255,0.06)]",
      )}
      style={{ borderRadius: "13.5cqw" }}
    >
      <div
        className="relative overflow-hidden bg-black"
        style={{ borderRadius: "11.2cqw", aspectRatio: SCREENSHOT_ASPECT }}
      >
        {children}
        {island ? (
          <div
            aria-hidden="true"
            className="absolute left-1/2 z-10 -translate-x-1/2 bg-black"
            style={{
              top: "1.6cqw",
              width: "30cqw",
              height: "8.6cqw",
              borderRadius: "4.3cqw",
            }}
          />
        ) : null}
      </div>
    </div>
  </div>
);
