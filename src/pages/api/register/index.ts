import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).end()
  }

  const {name, username, email, password} = req.body

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  const emailTaken = await prisma.user.findUnique({
    where: {
      email,
    }
  })

  if(userExists) {
    return res.status(400).json({message: 'Nome de usuário indisponível.'})
  }

  if(emailTaken) {
    return res.status(400).json({message: 'Email já cadastrado.'})
  }

  const salt = bcrypt.genSaltSync(10)
  const secret = 'kdsn838393290hfjbhdwihjqwbifdyuwgf'

  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      password: bcrypt.hashSync(password, salt),
      about: ''
    }
  })

  setCookie({res}, '@uspparty:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7,
    path: '/'    
  })

  return res.status(201).json(user)
}
