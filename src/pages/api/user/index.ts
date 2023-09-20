import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }

  const { username } = req.body

  if(!username) {
    return res.status(404).json({message: 'Usuário não encontrado.'})
  }

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if(!user) {
    return res.status(404).json({message: `Usuário não encontrado.`})
  }

  return res.status(200).json({message: `Usuário encontrado.`})
}
