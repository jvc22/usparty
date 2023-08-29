import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import nookies from 'nookies'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'GET') {
    return res.status(405).end()
  }

  return res.status(200).json({message: 'test ok'})

}
