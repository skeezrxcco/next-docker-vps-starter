/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // Disable static generation for pages that need database access
    workerThreads: false,
    cpus: 1
  }
}

module.exports = nextConfig
