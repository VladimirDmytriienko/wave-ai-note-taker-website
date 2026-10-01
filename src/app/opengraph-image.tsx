import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const alt = `${site.storeName} — ${site.storeSubtitle}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card for every page. Rendered once at build time. */
const OpengraphImage = async () => {
  // The Wave mark, embedded so the card needs no network fetch to render.
  const mark = await readFile(join(process.cwd(), "src/assets/brand/wave-mark.png"));
  const markSrc = `data:image/png;base64,${mark.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#060608",
          backgroundImage:
            "radial-gradient(60% 55% at 50% -10%, rgba(255,23,52,0.24), rgba(6,6,8,0) 70%)",
          color: "#f6f7f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={markSrc} width={57} height={60} alt="" />
          <div style={{ fontSize: 36, fontWeight: 600, letterSpacing: -0.5 }}>
            {site.appName}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 74,
            fontWeight: 600,
            letterSpacing: -2.6,
            lineHeight: 1.06,
            maxWidth: 900,
          }}
        >
          Voice notes that never leave your iPhone.
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "rgba(234,236,242,0.55)" }}>
          On-device transcription · iPhone and iPad · iOS {site.platform.minimumOsVersion} or later
        </div>
      </div>
    ),
    size,
  );
};

export default OpengraphImage;
