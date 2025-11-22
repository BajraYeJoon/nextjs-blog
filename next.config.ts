import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
    images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        port: '',
        pathname: '/7.x/avataaars/svg',
      },
    ],
  },
};

export default nextConfig;
