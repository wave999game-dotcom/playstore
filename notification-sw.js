// Basic Notification Service Worker to prevent 404 errors

self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    self.clients.claim();
});

// Handle incoming push notifications
self.addEventListener('push', function(event) {
    const title = 'Wave999';
    const options = {
      body: event.data ? event.data.text() : 'Check out our latest games!',
      icon: 'logo.png',
      badge: 'logo.png'
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.openWindow('https://www.wave999.com/pages/redirect/redirect?inviteCode=MTM5')
    );
});