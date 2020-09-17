import { urlBase64ToUint8Array, subscribeOnServer } from './js/utilities'
import icon from './img/icon.png'
import badge from './img/badge.png'
require('dotenv').config()

const applicationServerPublicKey = process.env.VAPID_PUBLIC_KEY

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open('estcequelasevredeborde').then(function (cache) {
      return cache.addAll(['/', '/index.html'])
    })
  )
  return self.skipWaiting()
})

self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('push', function (event) {
  const data = event.data.json()
  const title = 'Alerte Sèvre'
  const options = {
    body: data.message,
    icon,
    badge,
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', function (event) {
  event.notification.close()

  event.waitUntil(
    clients.openWindow('https://estcequelasevredeborde.vercel.app/')
  )
})

self.addEventListener('pushsubscriptionchange', async function (event) {
  console.log("[Service Worker]: 'pushsubscriptionchange' event fired.")
  const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey)
  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      })
      .then(async (newSubscription) => {
        console.log('newSubscription', newSubscription)
        try {
          subscribeOnServer(newSubscription)
        } catch (err) {
          console.log(err)
        }
      })
  )
})
