"use server"
import { prisma } from "./prisma"

const get_roles = async () =>{
    const data_roles = await prisma.roles.findMany({
        select:{
            id: true,
            Nombre_rol: true
        }
    })
    return data_roles
}
export{get_roles}
