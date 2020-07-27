import {
  urlBase64ToUint8Array,
  subscribeOnServer,
  unsubscribeOnServer,
} from './js/utilities'
import icon from './img/icon.png'
import badge from './img/badge.png'
require('dotenv').config()

const applicationServerPublicKey = process.env.VAPID_PUBLIC_KEY
const version = 1

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('estcequelasevredeborde').then(function (cache) {
      return cache.addAll(['/', '/index.html', '/styles.css'])
    })
  )
  console.log(`Installation du service worker v${version}`)

  return self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
  console.log(`Activation du service worker v${version}`)
})

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('push', function (event) {
  console.log('[Service Worker] Push Received.')
  const data = event.data.json()
  const title = 'Alerte Sèvre'
  const options = {
    body: data.message,
    icon,
    badge,
  }
  console.log('options', options)

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (event) {
  console.log('[Service Worker] Notification click Received.')

  event.notification.close()

  event.waitUntil(clients.openWindow('/'))
})

self.addEventListener('pushsubscriptionchange', function (event) {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.")
  unsubscribeOnServer(event.oldSubscription)
  const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey)
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then(function (newSubscription) {
        // TODO: Send to application server
        subscribeOnServer(newSubscription)
        console.log('[Service Worker] New subscription: ', newSubscription)
      })
  )
})
