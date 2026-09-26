import { ImageResponse } from "next/og";

// Browser-tab icon: "a" on a near-black rounded square.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 8,
          color: "#FFFFFF",
          fontSize: 22,
          paddingBottom: 3,
        }}
      >
        a
      </div>
    ),
    size,
  );
}
