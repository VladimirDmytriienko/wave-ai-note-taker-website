import { site } from "@/config/site";
import { cn } from "@/lib/cn";

interface LogoProps {
  /** Hide the wordmark and show the mark alone. */
  markOnly?: boolean;
  className?: string;
}

/**
 * The app mark, inlined from `assets/expo.icon/Assets/expo-symbol 2.svg` in
 * the iOS project — same path data, unmodified. Inlined rather than loaded as
 * an image so it scales with the type and needs no extra request.
 */
export const Logo = ({ markOnly = false, className }: LogoProps) => (
  <span className={cn("inline-flex items-center gap-2.5 text-white", className)}>
    <svg
      viewBox="0 0 652 606"
      aria-hidden="true"
      className="h-[0.95em] w-auto"
      fill="currentColor"
    >
      <path d="M353.554 0H298.446C273.006 0 249.684 14.6347 237.962 37.9539L4.37994 502.646C-1.04325 513.435 -1.45067 526.178 3.2716 537.313L22.6123 582.918C34.6475 611.297 72.5404 614.156 88.4414 587.885L309.863 222.063C313.34 216.317 319.439 212.826 326 212.826C332.561 212.826 338.659 216.317 342.137 222.063L563.559 587.885C579.46 614.156 617.352 611.297 629.388 582.918L648.728 537.313C653.451 526.178 653.043 513.435 647.62 502.646L414.038 37.9539C402.316 14.6347 378.994 0 353.554 0Z" />
    </svg>
    {markOnly ? null : (
      <span className="text-[1.0625rem] font-semibold tracking-[-0.02em]">
        {site.appName}
      </span>
    )}
  </span>
);
