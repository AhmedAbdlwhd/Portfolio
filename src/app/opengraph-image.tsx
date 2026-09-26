import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// The preview card shown when the site is shared (LinkedIn, Slack, X…). Uses Geist, Next's default image font.
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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
          background: "#F6F6F4",
          backgroundImage: "radial-gradient(circle at 88% 12%, rgba(47,91,255,0.22), rgba(246,246,244,0) 45%)",
          color: "#111214",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#5C6068", letterSpacing: 1 }}>
          {site.name} · {site.role}
        </div>
        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.08, letterSpacing: -2.5, maxWidth: 960 }}>
          {site.tagline}
        </div>
        <div style={{ display: "flex", gap: 14 }}>
          {["NLP", "Machine learning", "Data analysis"].map((t) => (
            <div
              key={t}
              style={{
                display: "flex",
                padding: "10px 22px",
                borderRadius: 999,
                border: "1px solid #E6E6E2",
                background: "#FFFFFF",
                fontSize: 24,
                color: "#5C6068",
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
