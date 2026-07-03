import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Ticketmaster Discovery API serves event artwork from these CDNs.
    remotePatterns: [
      { protocol: "https", hostname: "s1.ticketm.net" },
      { protocol: "https", hostname: "**.ticketm.net" },
      { protocol: "https", hostname: "media.ticketmaster.com" },
    ],
  },
};

export default nextConfig;
