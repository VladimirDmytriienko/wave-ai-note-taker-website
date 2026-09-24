import { ImageResponse } from "next/og";

import { site } from "@/config/site";

export const alt = `${site.appName} — voice notes for iPhone`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The app mark, as a data URI so the card needs no network fetch to render. */
const mark =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 652 606" fill="#ffffff">' +
      '<path d="M353.554 0H298.446C273.006 0 249.684 14.6347 237.962 37.9539L4.37994 502.646C-1.04325 513.435 -1.45067 526.178 3.2716 537.313L22.6123 582.918C34.6475 611.297 72.5404 614.156 88.4414 587.885L309.863 222.063C313.34 216.317 319.439 212.826 326 212.826C332.561 212.826 338.659 216.317 342.137 222.063L563.559 587.885C579.46 614.156 617.352 611.297 629.388 582.918L648.728 537.313C653.451 526.178 653.043 513.435 647.62 502.646L414.038 37.9539C402.316 14.6347 378.994 0 353.554 0Z"/>' +
      "</svg>",
  );

/** Social card for the site root. Inner pages inherit it unless they add one. */
const OpengraphImage = () =>
  new ImageResponse(
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
            "radial-gradient(60% 55% at 50% -10%, rgba(61,155,255,0.30), rgba(6,6,8,0) 70%)",
          color: "#f6f7f9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <img src={mark} width={38} height={35} alt="" />
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
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
          On-device transcription · iPhone · iOS {site.platform.minimumOsVersion} or later
        </div>
      </div>
    ),
    size,
  );

export default OpengraphImage;
