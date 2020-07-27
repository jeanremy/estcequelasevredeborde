import {
  urlBase64ToUint8Array,
  fetchData,
  subscribeOnServer,
  unsubscribeOnServer,
} from './utilities'
require('dotenv').config()

fetchData()

const applicationServerPublicKey = process.env.VAPID_PUBLIC_KEY

const pushButton = document.querySelector('.subscribe')

let isSubscribed = false
let swRegistration = null

function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Notifications bloquées'
    pushButton.disabled = true
    return
  }

  if (isSubscribed) {
    pushButton.textContent = 'Se désabonner des alertes'
  } else {
    pushButton.textContent = "S'abonner aux alertes"
  }

  pushButton.disabled = false
}

function subscribeUser() {
  const applicationServerKey = urlBase64ToUint8Array(applicationServerPublicKey)
  swRegistration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: applicationServerKey,
    })
    .then(function (subscription) {
      subscribeOnServer(subscription)
      isSubscribed = true
      updateBtn()
    })
    .catch(function (err) {
      console.log('Failed to subscribe the user: ', err)
      updateBtn()
    })
}

function unsubscribeUser() {
  swRegistration.pushManager
    .getSubscription()
    .then(function (subscription) {
      if (subscription) {
        unsubscribeOnServer(subscription)
        return subscription.unsubscribe()
      }
    })
    .catch(function (error) {
      console.log('Error unsubscribing', error)
    })
    .then(function () {
      isSubscribed = false
      updateBtn()
    })
}

function initializeUI() {
  pushButton.addEventListener('click', function () {
    pushButton.disabled = true
    if (isSubscribed) {
      unsubscribeUser()
    } else {
      subscribeUser()
    }
  })

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription().then(function (subscription) {
    isSubscribed = !(subscription === null)
    if (subscription) {
      subscribeOnServer(subscription)
    }

    updateBtn()
  })
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  navigator.serviceWorker
    .register('../sw.js')
    .then(function (swReg) {
      swRegistration = swReg
      initializeUI()
    })
    .catch(function (error) {
      console.error('Service Worker Error', error)
    })
} else {
  pushButton.remove()
}
