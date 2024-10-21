'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { get_roles } from '@/lib/roles'
import { get_id } from '@/lib/data'

export default function EditarUsuario({ params }: { params: { id: string } }) {
  const [formuser, setFormUser] = useState(null) as any
  const [formRoles, setFormRoles] = useState([])

  useEffect(() => {
    async function rol() {
      const data = await get_roles() as any
      setFormRoles(data)
    }

    async function user() {
      const data = await get_id(params.id) as any
      setFormUser(data)
    }

    user()
    rol()
  }, [params.id])

  const [formData, setFormData] = useState({
    rut: '',
    nombre: '',
    nombreUsuario: '',
    email: '',
    rol: ''
  })

  useEffect(() => {
    if (formuser) {
      setFormData({
        rut: formuser.rut,
        nombre: formuser.name,
        nombreUsuario: formuser.username,
        email: formuser.email,
        rol: formuser.rol_id
      })
    }
  }, [formuser])

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
    const res = await fetch("/api/usuario", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    const respon = await res.json()
    console.log(respon)
  }

  if (!formuser) {
    return <p>cargando...</p>
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Edicion de Usuario {params.id}</CardTitle>
        <CardDescription>Ingresa tus datos para crear una nueva cuenta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rut">RUT</Label>
            <Input 
              id="rut" 
              name="rut" 
              placeholder="Ej: 12345678-9" 
              required 
              value={formData.rut} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre Completo</Label>
            <Input 
              id="nombre" 
              name="nombre" 
              placeholder="Juan Pérez" 
              required 
              value={formData.nombre} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nombreUsuario">Nombre de Usuario</Label>
            <Input 
              id="nombreUsuario" 
              name="nombreUsuario" 
              placeholder="juanperez" 
              required 
              value={formData.nombreUsuario} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Correo Electrónico</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="juan@ejemplo.com" 
              required 
              value={formData.email} 
              onChange={handleInputChange} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol">Rol</Label>
            <Select value={formData.rol} onValueChange={handleRolChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona un rol" />
              </SelectTrigger>
              <SelectContent>
                {formRoles.map((item: any) => (
                  <SelectItem key={item.id} value={item.id}>{item.Nombre_rol}</SelectItem>
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
