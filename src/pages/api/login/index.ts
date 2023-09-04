import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import nookies from 'nookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }

  const {username, password} = req.body

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if(!user) {
    return res.status(401).json({message: 'Usuário não encontrado.'})
  }

  const passOk = bcrypt.compareSync(password, user.password)

  if(!passOk) {
    return res.status(403).json({message: `Senha inválida.`})
  } else {
    nookies.set({ res }, '@uspparty', user.username, {
      maxAge: 60 * 60 * 24 * 14,
      path: '/'
    })  
  }

  return res.status(200).json({message: 'Login realizado com sucesso!'})

}
