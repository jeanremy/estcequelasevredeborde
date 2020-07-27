# Est-ce que la Sèvre deborde ?

![Capture d'écran du site internet](screenshot.png?raw=true "Capture d'écran")

Une PWA pour savoir si la Sèvre déborde et si je peux, ou non, rentrer en vélo par les berges.

Le site est accessible à l'adresse [estcequelasevredeborde.fr](https://estcequelasevredeborde.fr)

Le site est hébergé par [Vercel](https://vercel.com/).

Pour les notifications, les données de chaque navigateur sont anonymes et stockées dans une base [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_france_search_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&gclid=EAIaIQobChMInbKivaTu6gIVxfZRCh2fEAupEAAYASAAEgKuxvD_BwE).

Les données de niveau de l'eau proviennent de l'[API Hubeau](http://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_entite=M750242010&size=1). La hauteur d'eau butoir a été fixée arbitrairement et empiriquement. Le seul critère était de voir le chemin recouvert par l'eau. Elle est pour le moment fixée à 350mm, mais pourra être modifiée.

Toute PR ou issue est la bienvenue.
