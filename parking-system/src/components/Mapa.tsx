"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L, { LatLngExpression } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Simulación de datos de usuarios en el mapa
const mapUsers = [
    { id: 1, name: "Emilio Díaz", position: [-34.9828, -71.2417] },
    { id: 2, name: "Jessy Alvaréz", position: [-34.9858, -71.2387] },
    { id: 3, name: "Diego Sanchéz", position: [-34.9808, -71.2447] },
]

export default function MapaParking() {
    const [activeItem, setActiveItem] = useState("Ubicación Parquímetros")



    const handleViewUser = (userId: number) => {
        console.log(`Ver detalles del usuario con ID: ${userId}`)
        // Aquí puedes agregar la lógica para mostrar los detalles del usuario
    }

    // Coordenadas de Curicó, Chile
    const curicoPosition: LatLngExpression = [-34.9828, -71.2417]

    // Icono personalizado para los marcadores (ahora en rojo)
    const customIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm" style={{ height: "calc(100vh - 200px)" }}>
            <MapContainer
                center={curicoPosition}
                zoom={13}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapUsers.map((mapUser) => (
                    <Marker key={mapUser.id} position={mapUser.position as LatLngExpression} icon={customIcon}>
                        <Popup>
                            <div className="p-2">
                                <h3 className="font-semibold mb-2">{mapUser.name}</h3>
                                <Button
                                    onClick={() => handleViewUser(mapUser.id)}
                                    size="sm"
                                    className="w-full"
                                >
                                    Ver usuario
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>

    )
}
