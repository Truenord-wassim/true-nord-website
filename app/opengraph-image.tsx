import { ImageResponse } from "next/og";

// This file generates the preview image shown when a True Nord link is shared
// on LinkedIn, WhatsApp, Facebook, etc. Next.js detects it automatically and
// adds the right tags — no extra metadata needed. 1200x630 is the standard
// social-share size.
export const alt = "True Nord — Canadian Grocery Brands for GCC Markets";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#1B2A4A", // brand navy
          color: "#ffffff",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Red accent bar — matches the one used across the site */}
        <div
          style={{
            width: "90px",
            height: "10px",
            backgroundColor: "#B5312A",
            marginBottom: "40px",
          }}
        />
        <div style={{ fontSize: "100px", fontWeight: 700 }}>True Nord</div>
        <div
          style={{
            fontSize: "46px",
            marginTop: "16px",
            color: "rgba(255,255,255,0.9)",
          }}
        >
          True Direction. Zero Complexity.
        </div>
        <div
          style={{
            fontSize: "30px",
            marginTop: "32px",
            color: "rgba(255,255,255,0.75)",
          }}
        >
          Canadian grocery brands for GCC & MENA retailers.
        </div>
      </div>
    ),
    size
  );
}
