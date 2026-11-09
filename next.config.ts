import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The quilts now live on the home page, one card each.
      { source: "/quilts", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
