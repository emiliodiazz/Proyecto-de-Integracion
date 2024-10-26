'use server'

import {prisma} from '@/lib/prisma'
import bcrypt from 'bcryptjs'

const checkExistingUser = async (email: string) => {

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        passwordHash: true
      }
    })

    return user
  } catch (err: any) {
    console.log(err)
    return null
  }
}


const validatePassword = async (password: string, passwordHash: string) => {
  try {
    const match = await bcrypt.compare(password, passwordHash)
    return match
  } catch (err: any) {
    console.log(err)
    return null
  }
}

export {checkExistingUser, validatePassword}