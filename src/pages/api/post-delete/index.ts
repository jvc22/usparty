import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }

  const {postId} = req.body

  await prisma.post.delete({
    where: {
        id: postId
    }
  })

  return res.status(200).end()
}
