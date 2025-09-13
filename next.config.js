const runtimeCaching = require('next-pwa/cache')
const withPWA = require('next-pwa')({
  dest: 'public',
  // only enable PWA in production builds
  disable: process.env.NODE_ENV !== 'production',
  register: true,
  skipWaiting: true,
  runtimeCaching,
})

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'image2url.com', 'images.unsplash.com'],
  },
})

// runtimeCaching may be added later for custom caching strategies
