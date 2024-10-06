"use client"
import { signOut } from "next-auth/react"
 
export function Logout() {
  return <button onClick={() => signOut()}>Cerrar Sesión</button>
}