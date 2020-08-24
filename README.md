# Est-ce que la Sèvre deborde ?

![Capture d'écran du site internet](screenshot.png?raw=true "Capture d'écran")

Une PWA pour savoir si la Sèvre déborde et si je peux, ou non, passer en vélo par les berges.

Le site sera accessible à l'adresse [estcequelasevredeborde.fr](https://estcequelasevredeborde.fr)

Le site est hébergé par [Vercel](https://vercel.com/).

Pour les notifications, les données de chaque navigateur sont anonymes et stockées dans une base [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_emea_france_search_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&gclid=EAIaIQobChMInbKivaTu6gIVxfZRCh2fEAupEAAYASAAEgKuxvD_BwE).

Les données de niveau de l'eau proviennent de l'[API Hubeau](http://hubeau.eaufrance.fr/api/v1/hydrometrie/observations_tr?code_entite=M750242010&size=1).

Les critères pour que le chemin soit recouvert sont:

- que la [Loire dépasse 6400mm](https://www.vigicrues.gouv.fr/niv3-station.php?CdEntVigiCru=9&CdStationHydro=M800001010&GrdSerie=H&ZoomInitial=3)
- que l'écluse soit ouverte. Elle l'est [une heure avant et après la marée haute](https://www.ports-nantes.fr/wp-content/uploads/2016/03/AvisUsagersSevre.pdf).

Pour le moment, les marées ne sont pas vérifiées, car la hauteur maxi n'est jamais dépassée en dehors du créaneau d'ouverture de l'écluse (a vérifier).

Toute PR ou issue est la bienvenue.
