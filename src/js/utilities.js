export const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
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
    'https://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_entite=M750242010&size=1',
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

export const subscribeOnServer = (subscription) => {
  saveToServer('subscribe', subscription)
}

export const unsubscribeOnServer = (subscription) => {
  saveToServer('unsubscribe', subscription)
}

function saveToServer(action, subscription) {
  console.log('saveToServer -> subscription', subscription)
  fetch(`/api/${action}`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json',
    },
  })
}
