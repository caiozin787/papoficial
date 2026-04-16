import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const posts = await prisma.post.findMany({ include: { author: true } })
      return res.status(200).json(posts)
    }

    if (req.method === 'POST') {
      const { title, content, authorId } = req.body
      if (!title || !authorId) return res.status(400).json({ error: 'title and authorId required' })
      const post = await prisma.post.create({ data: { title, content, authorId } })
      return res.status(201).json(post)
    }

    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
