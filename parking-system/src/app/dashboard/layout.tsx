import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import DashboardTest from "@/components/Sidebar";


export default async function SessionLayout(
  { children }: { children: React.ReactNode }
) {
  const session = await auth()
  console.log("SALISTE", session)
  if(!session){
    return redirect("/")
  }
  return (
    <SessionProvider session={session}>
        <DashboardTest>
            {children}   
        </DashboardTest>  
    </SessionProvider>
  )
}