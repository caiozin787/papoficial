import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const users = await prisma.user.findMany({ include: { posts: true } })
      return res.status(200).json(users)
    }

    if (req.method === 'POST') {
      const { name, email } = req.body
      if (!name || !email) return res.status(400).json({ error: 'name and email required' })
      const user = await prisma.user.create({ data: { name, email } })
      return res.status(201).json(user)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
