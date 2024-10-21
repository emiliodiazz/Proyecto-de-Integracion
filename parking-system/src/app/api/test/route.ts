import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET=async(req:Request)=>{
    try {
        const data = await prisma.roles.findMany()
        return NextResponse.json({message:data},{status:200})
        
    } catch (error:any) {
        return NextResponse.json({message:error.message},{status:500})
    }
};