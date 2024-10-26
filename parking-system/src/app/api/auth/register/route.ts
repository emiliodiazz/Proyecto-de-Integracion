import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export const POST = async (req: Request) => {
  const body = await req.json()

  if (!body.username || !body.name || !body.email || !body.password || !body.rut) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  try {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(body.password, salt)

    const user = await prisma.user.create({
      data: {
        rut: body.rut,
        username: body.username,
        name: body.name,
        email: body.email,
        passwordHash: hash
      }
    })

    return NextResponse.json({ message: 'Usuario creado con éxito '}, { status: 201})

  } catch (err: any) {
    console.log(err.message)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}