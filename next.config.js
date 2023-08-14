/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  distDir: process.env.BUILD_DIR || '.next',
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
}

module.exports = nextConfig
