const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://fe-project-epigram-api.vercel.app/23-kimyumin/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
