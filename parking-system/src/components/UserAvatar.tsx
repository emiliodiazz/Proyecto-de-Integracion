'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function AuthPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{session ? "Perfil de Usuario" : "Bienvenido"}</CardTitle>
          <CardDescription>
            {session ? "Información de tu sesión" : "Por favor, inicia sesión para continuar"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {session ? (
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
              </Avatar>
              <div className="text-center">
                <h2 className="text-2xl font-bold">{session.user?.name}</h2>
                <p className="text-muted-foreground">{session.user?.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-center">Inicia sesión para ver tu perfil y acceder a todas las funciones.</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => session ? signOut() : signIn("google")} variant="outline">
            {session ? "Cerrar Sesión" : "Iniciar Sesión"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}