import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }

  const {about, userId} = req.body

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  if(user) {
    setCookie({ res }, '@uspparty', user.username, {
      maxAge: 60 * 60 * 24 * 14,
      path: '/'
    })
  }

  await prisma.user.update({
    where: {
        id: userId
    },
    data: {
        about,
    }
  })

  return res.status(200).json({username: user?.username})
}
