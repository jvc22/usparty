import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }

  const {author,title, description, place, day, month, year, s_hour, s_minute, e_hour, e_minute, link} = req.body

  const user = await prisma.user.findUnique({
    where: {
      username: author
    }
  })

  if(!user) {
    return res.status(401).json({message: 'Usuário não encontrado.'})
  }
  
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))

  await prisma.post.create({
    data: {
        author,
        about: user.about,
        title,
        description,
        place,
        day,
        month,
        year,
        date,
        start_hour: s_hour,
        start_minute: s_minute,
        end_hour: e_hour,
        end_minute: e_minute,
        link,
    }
  })

  return res.status(201).end()
}
