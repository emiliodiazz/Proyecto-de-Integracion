import { prisma } from '@/lib/prisma'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export const GET = auth(async (req: Request, { params }) => {
  const id = params?.id as string

  try {
    const usuario = await prisma.user.findUnique({
      where: {
        id: id
      }
    })

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    return NextResponse.json({ user: usuario }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
})

export const PATCH = auth(async (req: Request, { params }) => {
  const id = params?.id as string
  const { name, username } = await req.json()

  try {
    const usuario = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        name: name,
        username: username
      }
    })

    return NextResponse.json({ user: usuario }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
})

export const DELETE = auth(async (req: Request, { params }) => {
  const id = params?.id as string

  try {
    const usuario = await prisma.user.delete({
      where: {
        id: id
      }
    })

    return NextResponse.json({ message: `Usuario con ID: ${id} fue eliminado con éxito` }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
})