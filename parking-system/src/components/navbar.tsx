"use client"
import { signIn } from 'next-auth/react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Aquí iría la lógica de inicio de sesión
    console.log('Iniciar sesión')
    signIn('credentials', {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    })


    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo y nombre de la empresa */}
          <div className="flex items-center">
            {/*asi se agrega una imagen*/}
            <Image height={52} width={52} alt='imagen' src="/LogoCurico.png" />
            <span className="text-lg font-semibold">Parcking System</span>
          </div>

          {/* Enlaces de navegación */}
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-foreground hover:text-primary transition-colors">
              Inicio
            </Link>
            <Link href="/contacto" className="text-foreground hover:text-primary transition-colors">
              Contáctanos
            </Link>
            <Link href="/precio" className="text-foreground hover:text-primary transition-colors">
              Precio
            </Link>
            <Link href="/terminos" className="text-foreground hover:text-primary transition-colors">
              Términos
            </Link>
          </div>

          {/* Botón de inicio de sesión y modal */}
          <div className='bg-white'>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button >Iniciar Sesión</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Iniciar Sesión</DialogTitle>
                  <DialogDescription>
                    Ingresa tus credenciales para acceder a tu cuenta.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input id="email" type="email" placeholder="tu@ejemplo.com" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-slate-500">Iniciar Sesión</Button>
                </form>

                <button onClick={() => signIn('google', {redirectTo:"/dashboard"})}>Iniciar sesión con Google</button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </nav>
  )
}