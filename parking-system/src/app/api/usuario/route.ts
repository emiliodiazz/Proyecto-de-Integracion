import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export const GET = auth(async (req: Request) => {
  const session = await auth()

  //if (!session) return NextResponse.json({ message: 'Usuario no autenticado'}, { status: 401 })

  try {
    const usuarios = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        rut: true,
        email: true,
        Roles: {
          select: {
            id: true,
            Nombre_rol: true
          }
        }
      }
    })

    return NextResponse.json(usuarios, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({
      message: error.message
    }, { status: 400 })
  }
})


export const POST = auth(async (req: Request) => {
  const session = await auth()

  //if (!session) return NextResponse.json({ message: 'Usuario no autenticado'}, { status: 401 })

  let body: any
  try {
    body = await req.json()

    await prisma.user.create({
      data: {
        rut: body.rut,
        name: body.nombre,
        username: body.nombreUsuario,
        email: body.email,
        rol_Id: body.rol,
      }
    })

    return NextResponse.json({
      message: 'Usuario creado correctamente'
    }, { status: 201 })

  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({
      message: error.message
    }, { status: 400 })
  }
})


export const PATCH = auth(async (req: Request) => {
  const session = await auth()

  //if (!session) return NextResponse.json({ message: 'Usuario no autenticado'}, { status: 401 })

  let body: any
  try {
    body = await req.json()
    console.log(body)

    await prisma.user.update({
      where:{
        rut: body.rut
      },
      data:{
        name: body.nombre,
        username: body.nombreUsuario,
        email: body.email,
        rol_Id: body.rol,
      }
    })

    return NextResponse.json({
      message: 'Usuario actualizado correctamente'
    }, { status: 201 })

  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({
      message: error.message
    }, { status: 400 })
  }
})