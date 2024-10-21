import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  //pages: {
  //  signIn: '/' AGREGAR LA URL DEL LOGIN POR EJEMPLO /auth/login
  //}
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }: any) {
      // hacer lógica de verificación de email, si se usan credenciales.
      return true
    },
    
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id
        token.rol = user.rol_Id
      }

      return token
    },

    async session({ session, token}: any) {
      session.user.id = token.id
      session.user.rol = token.rol
      return session
    }
  }
})

