import axios from 'axios'

const isOnAlert = async function () {
  let APIUrl = `http://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_entite=M750242010&grandeur_hydro=H&size=2`

  let res = await axios.get(APIUrl)

  let results = res.data.data
  if (
    results[0].resultat_obs >= process.env.MAX_HEIGHT &&
    results[1].resultat_obs < process.env.MAX_HEIGHT
  ) {
    return { message: 'La sèvre déborde !' }
  } else if (
    results[0].resultat_obs <= process.env.MAX_HEIGHT &&
    results[1].resultat_obs >= process.env.MAX_HEIGHT
  ) {
    return { message: 'La sèvre ne déborde plus' }
  }

  return false
}

export default isOnAlert
