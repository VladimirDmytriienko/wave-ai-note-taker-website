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

interface ScreenshotScreenProps {
  id: ScreenshotId;
  priority?: boolean;
  sizes?: string;
}

/**
 * Just the screen content — the image, or its placeholder — filling whatever
 * box it is put in. Use inside a `DeviceFrame` when several screens share one
 * device (e.g. the story section cross-fading between them).
 *
 * Reads `src/config/screenshots.ts`: a registered screenshot renders through
 * `next/image`, a missing one renders a clearly-marked placeholder of the same
 * shape. Call sites do not branch on availability.
 */
export const ScreenshotScreen = async ({
  id,
  priority = false,
  sizes = "(min-width: 1024px) 24rem, 60vw",
}: ScreenshotScreenProps) => {
  const asset = getScreenshot(id);
  const t = await getTranslations();
  const label = t(asset.alt);

  return asset.src ? (
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
};

interface ScreenshotProps extends ScreenshotScreenProps {
  /** Wrap the screen in a phone bezel. */
  framed?: boolean;
  className?: string;
}

/** A single application screen, framed in a device by default. */
export const Screenshot = ({ framed = true, className, ...screen }: ScreenshotProps) => {
  if (!framed) {
    return (
      <div
        className={cn("@container overflow-hidden rounded-2xl bg-black", className)}
        style={{ aspectRatio: `${SCREENSHOT_WIDTH} / ${SCREENSHOT_HEIGHT}` }}
      >
        <ScreenshotScreen {...screen} />
      </div>
    );
  }

  return (
    <DeviceFrame className={className}>
      <ScreenshotScreen {...screen} />
    </DeviceFrame>
  );
};
