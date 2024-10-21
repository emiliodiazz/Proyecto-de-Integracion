"use server"
import { prisma } from "./prisma"

const get_id = async (id_user:string) =>{
    const data_id = await prisma.user.findUnique({
        where:{
            id: id_user.toString()
        }
    })
    return data_id
}
export{get_id}