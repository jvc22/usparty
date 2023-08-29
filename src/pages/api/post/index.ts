import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'GET') {
    return res.status(405).end()
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 2)

  const posts = await prisma.post.findMany({
    where: {
      date: {
        gte: yesterday
      }
    }
  })

  return res.status(200).json(posts.sort((a, b) => a.date.getTime() - b.date.getTime()))

}
