# `parcel-plugin-child-bundles-manifest`

A Parcel plugin for generating an bundle manifest containing a list of all the child bundles of the entry point. 
Suitable for use with service workers.

Usage
=======

### Install

```
yarn add -D parcel-plugin-child-bundles-manifest
```

### Build

```
parcel build entry.js
```

### Output

Outputs manifest file to same directory as the bundle file.

- dist/parcel-manifest.json

### Service-worker Example

```js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('index')
      .then((cache) => fetch('parcel-manifest.json') // Fetch the manifest here.
        .then((response) => response.json())
        .then((files) => cache.addAll(files))
      )
      .then(() => console.debug('Service Worker installed.'))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('fetch', (event) => event.respondWith(
  caches
    .match(event.request)
    .then((response) => response || fetch(event.request))
))

self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()))
```

License
========

MIT
