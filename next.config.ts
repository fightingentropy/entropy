import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year cache
  },
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'fbclid',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'utm_source',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'utm_medium',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'utm_campaign',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'utm_term',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'utm_content',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'gclid',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'msclkid',
          },
        ],
        destination: '/:path*',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
