import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable hot reloading and fast refresh
  reactStrictMode: true,
  experimental: {
    // Enable faster builds and hot reload
    optimizeCss: true,
  },
  // Ensure proper module resolution
  transpilePackages: [],
  // Force webpack to watch files
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 500,
        aggregateTimeout: 300,
      }
    }
    return config
  },
}

export default nextConfig
