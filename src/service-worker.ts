
/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />
import { build, files, version } from '$service-worker';

declare const self: ServiceWorkerGlobalScope;

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
    ...build, // the app itself
    ...files  // everything in `static`
];

// Add specific external assets you want to cache
const EXTERNAL_ASSETS = [
    'https://kolown.net/assets/ip25/zebra.glb'
];

// Install event handler - caches all necessary assets
self.addEventListener('install', (event: ExtendableEvent) => {
    async function addFilesToCache() {
        const cache = await caches.open(CACHE);
        await cache.addAll(ASSETS);
        
        // Try to cache external assets separately in case they fail
        for (const url of EXTERNAL_ASSETS) {
            try {
                await cache.add(url);
            } catch (error) {
                console.error(`Failed to cache external asset: ${url}`, error);
            }
        }
    }

    console.log('Service worker installing, version:', version);
    event.waitUntil(addFilesToCache());
});

// Activate event handler - cleans up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key);
        }
    }

    event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event: FetchEvent) => {
    // ignore non-GET requests
    if (event.request.method !== 'GET') return;

    async function respond() {
        const url = new URL(event.request.url);
        const cache = await caches.open(CACHE);

        // For app assets (JavaScript, CSS, HTML)
        if (ASSETS.includes(url.pathname)) {
            const response = await cache.match(url.pathname);
            if (response) return response;
        }
        
        // For external 3D model files - cache-first strategy
        if (EXTERNAL_ASSETS.includes(event.request.url) || 
            url.pathname.endsWith('.glb')) {
            const cachedResponse = await cache.match(event.request);
            if (cachedResponse) {
                // Return from cache but refresh in background
                fetch(event.request)
                    .then(networkResponse => {
                        if (networkResponse.ok) {
                            cache.put(event.request, networkResponse);
                        }
                    })
                    .catch(error => console.log('Network fetch failed, using cache', error));
                    
                return cachedResponse;
            }
        }

        // For everything else, try network first, fall back to cache
        try {
            const response = await fetch(event.request);

            // Validate it's a proper response
            if (!(response instanceof Response)) {
                throw new Error('Invalid response from fetch');
            }

            // Cache successful responses
            if (response.status === 200) {
                cache.put(event.request, response.clone());
            }

            return response;
        } catch (err) {
            // If network fails, try to serve from cache
            const cachedResponse = await cache.match(event.request);
            
            if (cachedResponse) {
                console.log(`Serving from cache:`, event.request.url);
                return cachedResponse;
            }

            // If not in cache either, we can't handle this request
            throw err;
        }
    }

    event.respondWith(respond());
});