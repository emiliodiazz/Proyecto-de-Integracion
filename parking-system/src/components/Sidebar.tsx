"use client"

import React, { useState } from "react"
import { Menu, X, Home, LogOut, ChevronDown, User, Cog, UserPlus, Eye, FileBarChart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { signOut, useSession } from "next-auth/react"
import { Logout } from "@/components/LogOut"
import { useRouter } from "next/navigation"



// Simulación de datos de usuario
const user = {
  name: "María García",
  email: "maria.garcia@example.com",
  avatar: "/placeholder-avatar.jpg"
}

// Simulación de datos de usuarios en el mapa
const mapUsers = [
  { id: 1, name: "Emilio Díaz", position: [-34.9828, -71.2417] },
  { id: 2, name: "Diegos Sánchez", position: [-34.9858, -71.2387] },
  { id: 3, name: "Jessy Alvarez", position: [-34.9808, -71.2447] },
]

export default function DashboardTest( { children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeItem, setActiveItem] = useState("Ubicación Parquímetros")
  const router = useRouter()

  const handleViewUser = (userId: number) => {
    console.log(`Ver detalles del usuario con ID: ${userId}`)
    // Aquí puedes agregar la lógica para mostrar los detalles del usuario
  }

  // Coordenadas de Curicó, Chile
  const curicoPosition = [-34.9828, -71.2417]

  // Icono personalizado para los marcadores (en rojo)
  const customIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  })

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white shadow-md transition-all duration-300 ease-in-out flex flex-col",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="p-4 flex items-center space-x-2">
          <img height={52} width={52} alt="imagen" src="/LogoCurico.png" />
          <span className={cn("text-xl font-bold transition-opacity duration-300", sidebarOpen ? "opacity-100" : "opacity-0")}>
            Parking System
          </span>
        </div>
        <nav className="mt-8 flex-grow">
          <MenuItem icon={<MapPin size={20} />} label="Ubicación Parquímetros" sidebarOpen={sidebarOpen} active={activeItem === "Ubicación Parquímetros"} onClick={() => {
            router.push("/dashboard")
          }} />
          <MenuItem icon={<FileBarChart size={20} />} label="Reportería" sidebarOpen={sidebarOpen} active={activeItem === "Reportería"} onClick={() => {
            router.push("/dashboard/reporteria")
          }} />
          <MenuItem icon={<Eye size={20} />} label="Ver usuario" sidebarOpen={sidebarOpen} active={activeItem === "Ver usuario"} onClick={() => {
            router.push("/dashboard/usuario/ver")
            setActiveItem("Ver usuario")
            console.log("Ver usuario")
          }} />
          <MenuItem icon={<UserPlus size={20} />} label="Agregar usuario" sidebarOpen={sidebarOpen} active={activeItem === "Agregar usuario"} onClick={() => {
            router.push("/dashboard/usuario/agregar")
            setActiveItem("Agregar usuario")
            console.log("Agregar usuario")
          }} />
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <UserMenu user={user} />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

function MenuItem({ icon, label, sidebarOpen, active, onClick }: { icon: React.ReactNode; label: string; sidebarOpen: boolean; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center space-x-2 px-4 py-2 w-full text-left transition-colors duration-200",
        active ? "bg-sky-50 text-sky-600" : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
      )}
    >
      {icon}
      <span className={cn("transition-opacity duration-300", sidebarOpen ? "opacity-100" : "opacity-0")}>
        {label}
      </span>
    </button>
  )
}

function UserMenu({ user }: { user: { name: string; email: string; avatar: string } }) {
    const session = useSession() as any
    console.log(session)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={session.data?.user?.image} alt={session.data.user.image} />
            <AvatarFallback>{session.data?.user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <div className="font-medium">{session.data?.user?.name}</div>
            <div className="text-sm text-gray-500">{session.data?.user?.email}</div>
          </div>
          <ChevronDown size={16} className="hidden md:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white z-[999]">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => console.log("Cerrando sesión...")}>
          <LogOut className="mr-2 h-4 w-4" />
          <Logout/>
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}