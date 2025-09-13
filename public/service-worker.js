// next-pwa will generate a service worker during build; this placeholder keeps the folder clean
self.addEventListener('install', () => {
  self.skipWaiting()
})
self.addEventListener('activate', () => {
  self.clients.claim()
})
