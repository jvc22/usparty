import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username } = req.body

  if(!username) {
    return res.status(404).json({message: 'undefined'})
  }

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(!user) {
    return res.status(404).json({message: 'Usuário não encontrado.'})
  }

  const userDetails = {
    name: user.name,
    about: user.about
  }

  const posts = await prisma.post.findMany({
    where: {
      author: username
    },
    orderBy: {
      date: 'desc'
    }
  })

  return res.status(200).json({posts, userDetails})
}
