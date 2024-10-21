'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { get_roles } from '@/lib/roles'
import { Item } from '@radix-ui/react-dropdown-menu'

export default function RegistroUsuario() {
  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    nombreUsuario: '',
    email: '',
    rol: ''
  })
  const [formRoles, setFormRoles] = useState([])
  useEffect(()=>{
    async function rol() {
        const data = await get_roles() as any
        setFormRoles(data)
 }
 rol()
  },[])
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleRolChange = (value: string) => {
    setFormData(prevData => ({
      ...prevData,
      rol: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Datos del formulario:', formData)
    // Aquí puedes agregar la lógica para enviar los datos al servidor
    const res = await fetch("/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
    })
    const respon= await res.json()
    console.log(respon)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Registro de Usuario</CardTitle>
        <CardDescription>Ingresa tus datos para crear una nueva cuenta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rut">RUT</Label>
            <Input id="rut" name="rut" placeholder="Ej: 12345678-9" required onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input id="nombre" name="nombre" placeholder="Juan Pérez" required onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombreUsuario">Nombre de Usuario</Label>
            <Input id="nombreUsuario" name="nombreUsuario" placeholder="juanperez" required onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input id="email" name="email" type="email" placeholder="juan@ejemplo.com" required onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol">Rol</Label>
            <Select onValueChange={handleRolChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                {formRoles && formRoles.length >0 && formRoles.map((Item:any)=>(
                    <SelectItem key={Item.id} value={Item.id}>{Item.Nombre_rol}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">Registrar Usuario</Button>
        </form>
      </CardContent>
    </Card>
  )
}