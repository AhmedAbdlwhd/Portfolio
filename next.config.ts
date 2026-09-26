import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Credly badge images.
    remotePatterns: [new URL("https://images.credly.com/**")],
  },
};

export default nextConfig;
