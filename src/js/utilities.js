import { get, set } from 'idb-keyval'

export const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const fetchData = () => {
  const answer = document.querySelector('.answer')
  const precision = document.querySelector('.precision')
  fetch(
    'https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_entite=M800001010&size=1',
    {
      method: 'GET',
    }
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.data[0].resultat_obs > process.env.MAX_HEIGHT) {
        answer.textContent = 'Oui.'
        precision.remove()
      } else {
        answer.textContent = 'Non.'
        if (res.data[0].resultat_obs > process.env.MAX_HEIGHT - 20) {
          precision.textContent = 'Mais ça se peut quand même.'
        } else {
          precision.remove()
        }
      }
    })
}

export const subscribeOnServer = async (subscription) => {
  unsubscribeOnServer()
  try {
    await set('subscription', JSON.stringify(subscription))
    saveToServer('subscribe', subscription)
  } catch (err) {
    console.error(err)
  }
}

export const unsubscribeOnServer = async () => {
  const oldSubscription = JSON.parse(await get('subscription'))
  try {
    if (oldSubscription) {
      saveToServer('unsubscribe', oldSubscription)
    }
  } catch (err) {
    console.error(err)
  }
}

function saveToServer(action, subscription) {
  fetch(`/api/${action}`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  })
}
