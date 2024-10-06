import { auth } from "@/auth";
import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";

//layouts recibe un componente y lo muestra por pantalla

//creamos la funcion especifica para el layout de la landing page
export default async function LandingLayout({
    //se crea el hijo "children" este sirve para dejar pasar html que envuelve el layout creado
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
   
   //se retorna el componente en este caso la navbar importada arriba y dentro de esta se carga el html que se encuentra en el children
  
    const session= await auth() 
    console.log(session)
    if(session){
      redirect("/dashboard")
    }
   return (
      <>
      <Navbar/>
      <main>
        {children}
      </main>
      </>
    );
  }