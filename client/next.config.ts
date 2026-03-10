import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@go-rental/shared'],
  outputFileTracingRoot: path.resolve(__dirname, '../'),
  turbopack: {
    root: path.resolve(__dirname, '../'),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
};

export default nextConfig;
