import type { NextConfig } from 'next'
import type { Configuration as WebpackConfig } from 'webpack'

const config: NextConfig = {
  output: 'standalone',
  experimental: {
    // Disable static generation for pages that need database access
    workerThreads: false,
    cpus: 1
  },
  webpack: (config: WebpackConfig, { isServer }) => {
    // Enable polling for file changes in Docker
    if (!isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  }
}

export default config
