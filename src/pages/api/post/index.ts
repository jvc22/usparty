import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'GET') {
    return res.status(405).end()
  }

  const date = new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })
  const tomorrow = new Date(date)
  tomorrow.setDate(tomorrow.getDate() - 1)

  const posts = await prisma.post.findMany({
    where: {
      date: {
        gte: tomorrow
      }
    },
    orderBy: {
      date: 'asc'
    }
  })

  return res.status(200).json(posts)

}
