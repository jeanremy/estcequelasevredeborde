import connectToDatabase from '../utilities/connectToDatabase'

module.exports = async (req, res) => {
  const { endpoint, keys } = req.body
  const db = await connectToDatabase(process.env.MONGODB_URI)
  const collection = await db.collection('users')

  if (!endpoint || !keys) {
    res.status(500).json({ message: 'wrong payload' })
  }

  try {
    const r = await collection.findOneAndDelete({ endpoint })
    console.log('r', r)
    res.status(200).send()
  } catch (err) {
    res.status(500).json({ message: err.body })
  }
}
