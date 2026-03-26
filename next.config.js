/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

module.exports = nextConfig;
