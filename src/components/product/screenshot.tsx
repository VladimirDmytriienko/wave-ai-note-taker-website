import Image from "next/image";

import {
  getScreenshot,
  SCREENSHOT_HEIGHT,
  SCREENSHOT_WIDTH,
  type ScreenshotId,
} from "@/config/screenshots";
import { getTranslations } from "@/i18n";
import { cn } from "@/lib/cn";

import { DeviceFrame } from "./device-frame";
import { ScreenshotPlaceholder } from "./screenshot-placeholder";

interface ScreenshotProps {
  id: ScreenshotId;
  /** Wrap the screen in a phone bezel. */
  framed?: boolean;
  /** Eager-load the screenshot — use for the hero only. */
  priority?: boolean;
  /** Responsive sizes hint for `next/image`. */
  sizes?: string;
  className?: string;
}

/**
 * A single application screen.
 *
 * Reads `src/config/screenshots.ts`: a registered screenshot renders through
 * `next/image`, a missing one renders a clearly-marked placeholder of the same
 * shape. Call sites do not branch on availability.
 */
export const Screenshot = async ({
  id,
  framed = true,
  priority = false,
  sizes = "(min-width: 1024px) 24rem, 60vw",
  className,
}: ScreenshotProps) => {
  const asset = getScreenshot(id);
  const t = await getTranslations();
  const label = t(asset.alt);

  const screen = asset.src ? (
    <Image
      src={asset.src}
      alt={label}
      width={SCREENSHOT_WIDTH}
      height={SCREENSHOT_HEIGHT}
      sizes={sizes}
      priority={priority}
      className="h-full w-full object-cover"
    />
  ) : (
    <ScreenshotPlaceholder
      screen={t("{screen} — screenshot not supplied yet", { screen: label })}
      capture={asset.capture}
    />
  );

  if (!framed) {
    return (
      <div
        className={cn("@container overflow-hidden rounded-2xl bg-black", className)}
        style={{ aspectRatio: `${SCREENSHOT_WIDTH} / ${SCREENSHOT_HEIGHT}` }}
      >
        {screen}
      </div>
    );
  }

  return <DeviceFrame className={className}>{screen}</DeviceFrame>;
};
