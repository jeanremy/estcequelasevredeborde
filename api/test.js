import webpush from '../utilities/webpush'
import connectToDatabase from '../utilities/connectToDatabase'

module.exports = async (req, res) => {
  if (
    req.query.user !== process.env.USERNAME &&
    req.query.password !== process.env.PASSWORD
  ) {
    return res.status(401).json({ message: 'unauthorized' })
  }

  const payload = { message: 'Test' }

  const db = await connectToDatabase()

  const collection = await db.collection('users')
  const users = await collection.find({}).toArray()

  const promises = users.map(async ({ _id, ...subscription }) => {
    return webpush.sendNotification(subscription, JSON.stringify(payload))
  })

  await Promise.allSettled(promises)

  res.status(200).json({ message: 'alert sent' })
}
