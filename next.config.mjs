import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false, // Hide "X-Powered-By: Next.js" header for security
  compress: true,
  pageExtensions: ['ts', 'tsx'],

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Whitelist only trusted image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      },
    ],
    // Remove deprecated 'domains' property
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: false, // Prevent SVG XSS attacks
  },

  // Request size limits (prevents DoS via large payloads)
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb', // Limit server action payload size
    },
  },

  // Suppress webpack warnings for Node.js APIs in Edge Runtime
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Security headers now handled by middleware.ts with nonce support

  // Redirects for common patterns
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);