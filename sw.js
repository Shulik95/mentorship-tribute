/* ========================================
   SERVICE WORKER FOR OFFLINE SUPPORT
   ======================================== */

const CACHE_NAME = 'mentorship-testimonials-v1.8.0';
const STATIC_CACHE_URLS = [
    './',
    './index.html',
    './styles.css',
    './script.js',
    './hebrew-system.js',
    './integration.js',
    './manifest.json'
];

// Images will be cached dynamically when loaded
const PARTICIPANT_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

const FONT_CACHE_URLS = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap',
    'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800&display=swap',
    'https://fonts.googleapis.com/css2?family=Assistant:wght@300;400;500;600;700;800&display=swap'
];

// Install Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Caching static assets...');
                return cache.addAll(STATIC_CACHE_URLS);
            })
            .then(() => {
                // Cache fonts separately to handle potential failures gracefully
                return caches.open(CACHE_NAME + '-fonts')
                    .then(cache => {
                        console.log('Caching fonts...');
                        return Promise.allSettled(
                            FONT_CACHE_URLS.map(url => 
                                fetch(url)
                                    .then(response => {
                                        if (response.ok) {
                                            return cache.put(url, response);
                                        }
                                    })
                                    .catch(err => console.log('Font cache failed for:', url))
                            )
                        );
                    });
            })
            .then(() => {
                console.log('Service Worker installed successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker installation failed:', error);
            })
    );
});

// Activate Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // Keep current caches
                        const validCaches = [
                            CACHE_NAME,
                            CACHE_NAME + '-fonts', 
                            CACHE_NAME + '-images'
                        ];
                        
                        // Delete old caches
                        if (!validCaches.includes(cacheName)) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated');
                return self.clients.claim();
            })
    );
});

// Fetch Strategy: Cache First with Network Fallback
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip Chrome extension requests
    if (event.request.url.startsWith('chrome-extension://')) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    console.log('Serving from cache:', event.request.url);
                    return cachedResponse;
                }
                
                // Not in cache, fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response before caching
                        const responseToCache = response.clone();
                        
                        // Determine cache strategy based on resource type
                        const url = event.request.url;
                        const isParticipantImage = url.includes('/images/participants/') && 
                            PARTICIPANT_IMAGE_EXTENSIONS.some(ext => url.toLowerCase().includes(ext));
                        
                        if (isParticipantImage) {
                            // Cache participant images with longer TTL
                            caches.open(CACHE_NAME + '-images')
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                    console.log('Caching participant image:', url);
                                });
                        } else {
                            // Cache other resources normally
                            caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, responseToCache);
                                });
                        }
                        
                        console.log('Serving from network and caching:', event.request.url);
                        return response;
                    })
                    .catch(error => {
                        console.error('Fetch failed for:', event.request.url, error);
                        
                        // Return offline fallback for navigation requests
                        if (event.request.destination === 'document') {
                            return caches.match('./index.html');
                        }
                        
                        // For other requests, return a basic error response
                        return new Response('Offline - Content not available', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Background Sync for improved offline experience
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        console.log('Background sync triggered');
        event.waitUntil(
            // Refresh cache when back online
            caches.open(CACHE_NAME)
                .then(cache => cache.addAll(STATIC_CACHE_URLS))
                .catch(error => console.error('Background sync failed:', error))
        );
    }
});

// Push notifications (if needed in future)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: './icon-192x192.png',
            badge: './badge-72x72.png',
            tag: 'mentorship-notification',
            requireInteraction: false,
            actions: [
                {
                    action: 'view',
                    title: 'View Program'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        event.waitUntil(
            clients.openWindow('./')
        );
    }
});

// Error handling
self.addEventListener('error', event => {
    console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
    console.error('Service Worker unhandled rejection:', event.reason);
    event.preventDefault();
});