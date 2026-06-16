import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fe-project-epigram-api.vercel.app/23-kimyumin/:path*',
      },
    ];
  },
};

export default nextConfig;
