import connectToDatabase from '../utilities/connectToDatabase'

module.exports = async (req, res) => {
  const { endpoint, keys } = req.body
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('users')

  if (!endpoint || !keys) {
    res.status(500).json({ message: 'wrong payload' })
  }

  try {
    await collection.insertOne({ endpoint, keys })
    res.status(200).json({ message: 'subscribed successfully' })
  } catch (err) {
    res.status(500).json({ message: err.body })
  }
}
