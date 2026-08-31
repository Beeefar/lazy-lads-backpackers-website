/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        // HostelMate room & property images CDN
        // Adjust the hostname if your HostelMate CDN uses a different domain
        protocol: 'https',
        hostname: 'cdn.hostelmate.co',
        pathname: '/**',
      },
      {
        // Fallback: some HostelMate installs serve from a custom domain
        protocol: 'https',
        hostname: '*.hostelmate.co',
        pathname: '/**',
      },
      {
        // HostelMate room images — hosted on DigitalOcean Spaces CDN
        protocol: 'https',
        hostname: '*.digitaloceanspaces.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Block indexing of API + private routes
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'index, follow' }],
      },
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        // Basic security headers
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
