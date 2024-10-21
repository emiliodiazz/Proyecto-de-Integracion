'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PencilIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function TablaUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const router = useRouter()
  useEffect(()=>{
    async function usuario() {
        const data = await fetch("/api/usuario") as any
        const res = await data.json()
        console.log(res)
        setUsuarios(res)
 }
usuario()
 },[])


  const handleEditar = (id: string) => {
    console.log(`Editando usuario con ID: ${id}`)
    // Aquí iría la lógica para editar el usuario
    router.push("/dashboard/usuario/editar/"+id)
  }

  const handleEliminar = (id: number) => {
    console.log(`Eliminando usuario con ID: ${id}`)
    setUsuarios(usuarios.filter((usuario:any) => usuario.id !== id))
  }

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableCaption>Lista de usuarios registrados</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Foto</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usuarios && usuarios.length>0 && usuarios.map((usuario:any) => (
            <TableRow key={usuario.id} className="hover:bg-gray-100 transition-colors">
              <TableCell className="font-medium">{usuario.id}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={usuario.image} alt={`Foto de ${usuario.name}`} />
                  <AvatarFallback>{usuario.name.split(' ').map((n:any) => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{usuario.name}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  usuario.Roles?.Nombre_rol === 'Administrador' ? 'bg-red-100 text-red-800' :
                  usuario.Roles?.Nombre_rol === 'Editor' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {usuario.Roles?.Nombre_rol}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="icon" className="mr-2" onClick={() => handleEditar(usuario.id)}>
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleEliminar(usuario.id)}>
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}