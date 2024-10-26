import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { checkExistingUser, validatePassword } from "./utils/auth/authUtils"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  providers: [//Google,
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email",
          name: "email",
          type: "email",
        },
        password: {
          label: "Password",
          name: "password",
          type: "password",
        },
      },
      authorize: async (credentials: any) => {
        let user = null

        const dbUser = await checkExistingUser(credentials.email)

        if (!dbUser) return null

        if (!dbUser.passwordHash) return null

        const validPassword = await validatePassword(credentials.password, dbUser.passwordHash)

        if (!validPassword) return null

        user = dbUser
        return user
      },
    }),
  ],
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

