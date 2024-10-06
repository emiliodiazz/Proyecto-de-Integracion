import LandingLayout from "@/layouts/LandinLayout";
import { title } from "process";
import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Car, MapPin, Clock, Shield, CreditCard, Phone } from "lucide-react"
import Link from "next/link"

export const metadata ={
  title:"Home Page"
}

//landing page
export default function Home() {
  return (
    <LandingLayout>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-blue-500 to-blue-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center text-white">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  El software de parquimetros mas confiable!
                </h1>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  System Parking es el software permite ver en tiempo real las ganancias, como tambien la ubicacion en la que se encuentra cada parquimetro. Nuestro software entrega un informe diario de cierre de dia como tambien uno mensual, permitiendo ver las ganancias generadas!.
                </p>
              </div>
              <div className="space-x-4 justify-center">
                <Button variant="outline" className="bg-white border-white text-black hover:bg-white hover:text-blue-600" size="lg">
                  Más información
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section id="servicios" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestros Servicios</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Shield className="h-12 w-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Seguridad 24/7</h3>
                <p className="text-gray-600">Vigilancia constante y sistemas de seguridad avanzados.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Clock className="h-12 w-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Acceso las 24 horas</h3>
                <p className="text-gray-600">Estaciona y retira tu vehículo en cualquier momento.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <CreditCard className="h-12 w-12 mb-4 text-blue-600" />
                <h3 className="text-xl font-semibold mb-2">Pagos flexibles</h3>
                <p className="text-gray-600">Opciones de pago por hora, día o mensualidades.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="ubicaciones" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Nuestras Ubicaciones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-6 flex flex-col items-center text-center">
                  <MapPin className="h-12 w-12 mb-4 text-blue-600" />
                  <h3 className="text-xl font-semibold mb-2">Estacionamiento Centro {i}</h3>
                  <p className="text-gray-600">Calle Principal #{i*100}, Ciudad</p>
                  <Button className="mt-4" variant="outline">Ver en mapa</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="contacto" className="w-full py-12 md:py-24 lg:py-32 bg-blue-50">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Contáctanos</h2>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  ¿Tienes alguna pregunta o necesitas más información? No dudes en contactarnos.
                </p>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-blue-600" />
                  <span className="text-lg">+1 234 567 890</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <Input placeholder="Nombre" />
                <Input placeholder="Email" type="email" />
                <Input placeholder="Teléfono" type="tel" />
                <Button>Enviar mensaje</Button>
              </div>
            </div>
          </div>
        </section>
    </main>
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500">© 2024 System Parking. Todos los derechos reservados.</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Términos de servicio
        </Link>
        <Link className="text-xs hover:underline underline-offset-4" href="#">
          Política de privacidad
        </Link>
      </nav>
    </footer>
    </LandingLayout>

  );
}
