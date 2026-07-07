import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Ticketmaster CDNs + any https host (admins paste arbitrary image URLs).
    remotePatterns: [
      { protocol: "https", hostname: "s1.ticketm.net" },
      { protocol: "https", hostname: "**.ticketm.net" },
      { protocol: "https", hostname: "media.ticketmaster.com" },
      { protocol: "https", hostname: "**" },
    ],
  },
};

export default nextConfig;
