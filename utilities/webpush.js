const webpush = require('web-push')

webpush.setVapidDetails(
  'mailto:contact@estcequelasevredeborde.fr',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
)

export default webpush
