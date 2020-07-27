import webpush from '../utilities/webpush'
import connectToDatabase from '../utilities/connectToDatabase'
import isOnAlert from '../utilities/isOnAlert'

module.exports = async (req, res) => {
  const payload = await isOnAlert()
  if (!payload) {
    res.status(200).json({ message: 'no alert' })
    return
  }

  const db = await connectToDatabase(process.env.MONGODB_URI)

  const collection = await db.collection('users')
  const users = await collection.find({}).toArray()

  const promises = users.map(async ({ _id, ...subscription }) => {
    return webpush.sendNotification(subscription, JSON.stringify(payload))
  })

  await Promise.allSettled(promises)

  res.status(200).json({ message: 'alert sent' })
}
