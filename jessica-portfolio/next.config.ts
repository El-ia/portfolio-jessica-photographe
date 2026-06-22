import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  compress: true,

  // Exclude heavy Sanity/styled-components server deps from the shared bundle.
  // @sanity/ui and @sanity/icons are excluded because they are already in transpilePackages.
  serverExternalPackages: ["sanity", "styled-components", "@sanity/vision"],

  experimental: {
    // Tree-shake lucide-react so only used icons are bundled.
    optimizePackageImports: ["lucide-react"],
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Prefer AVIF (≈50 % smaller than WebP), fall back to WebP.
    formats: ["image/avif", "image/webp"],
    // Cache optimised images for 1 year on Vercel's CDN.
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      // Immutable cache for hashed Next.js static assets (JS/CSS chunks).
      {
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // 24 h cache + 7-day stale-while-revalidate for public images.
      {
        source: "/images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;