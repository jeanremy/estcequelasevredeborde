import axios from 'axios'

const isOnAlert = async function () {
  let APIUrl =
    'https://www.vigicrues.gouv.fr/services/previsions.json/index.php?CdStationHydro=M800001010'
  const res = await axios.get(APIUrl)
  const previs = res.data.Simul.Prevs

  if (previs.length > 0) {
    // Si la prévision moyenne ne dépasse pas la hauteur, on file
    if (previs[0].ResMoyPrev < process.env.MAX_HEIGHT / 1000) return false

    // Si la prévision est dans un creneau d'une heure
    const now = new Date()

    let nowPlusOneHour = new Date()
    nowPlusOneHour.setTime(nowPlusOneHour.getTime() + 60 * 60 * 1000)

    const previsDate = new Date(previs[0].DtPrev)

    if (nowPlusOneHour > previsDate && now.getTime() < previsDate.getTime()) {
      return { message: 'La sèvre devrait déborder' }
    }
    return false
  }
  return false
}

export default isOnAlert
