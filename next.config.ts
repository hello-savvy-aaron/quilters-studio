import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Photos of quilts added through /admin are stored in Vercel Blob.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async redirects() {
    return [
      // The quilts now live on the home page, one card each.
      { source: "/quilts", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
