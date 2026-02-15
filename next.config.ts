import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://i.pravatar.cc/**')],
  },
};

export default nextConfig;
