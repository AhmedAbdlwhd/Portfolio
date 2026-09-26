import { ImageResponse } from "next/og";

// Home-screen icon on iPhone/iPad (iOS rounds the corners itself).
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#1D1D1F",
          color: "#FFFFFF",
          fontSize: 120,
          paddingBottom: 16,
        }}
      >
        a
      </div>
    ),
    size,
  );
}
