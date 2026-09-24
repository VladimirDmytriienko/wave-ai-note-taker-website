import type { ReactNode } from "react";

import type { Device } from "@/config/screenshots";
import { cn } from "@/lib/cn";

/**
 * Proportions per device, in container-query units (`cqw` = 1% of the frame's
 * width), so radius, bezel and island scale exactly with whatever width the
 * composition gives the device.
 */
const geometry = {
  iphone: { outer: "13.5cqw", bezel: "2.6cqw", inner: "11.2cqw", island: true },
  ipad: { outer: "3.4cqw", bezel: "1.35cqw", inner: "2.2cqw", island: false },
} as const satisfies Record<Device, { outer: string; bezel: string; inner: string; island: boolean }>;

interface DeviceFrameProps {
  children: ReactNode;
  device?: Device;
  /** CSS aspect-ratio of the screen, e.g. `"921 / 2000"`. */
  aspect: string;
  className?: string;
}

/** Generic device bezel around a screenshot — iPhone portrait or iPad landscape. */
export const DeviceFrame = ({
  children,
  device = "iphone",
  aspect,
  className,
}: DeviceFrameProps) => {
  const g = geometry[device];

  return (
    <div className={cn("@container w-full", className)}>
      <div
        className={cn(
          "relative w-full",
          // Brushed-metal rim: a gradient reads as a machined edge where a
          // flat border reads as a rectangle.
          "bg-[linear-gradient(150deg,#484c55_0%,#14161b_28%,#080a0e_62%,#3b3f47_100%)]",
          "shadow-[0_2cqw_6cqw_-1cqw_rgba(0,0,0,0.85),0_0_0_0.15cqw_rgba(255,255,255,0.06)]",
        )}
        style={{ borderRadius: g.outer, padding: g.bezel }}
      >
        <div
          className="relative overflow-hidden bg-black"
          style={{ borderRadius: g.inner, aspectRatio: aspect }}
        >
          {children}
          {g.island ? (
            <div
              aria-hidden="true"
              className="absolute left-1/2 z-10 -translate-x-1/2 bg-black"
              style={{ top: "1.6cqw", width: "30cqw", height: "8.6cqw", borderRadius: "4.3cqw" }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
