import NextAuth from 'next-auth'
import type { NextAuthOptions, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import type { JWT as NextAuthJWT } from 'next-auth/jwt'

// Define more specific types for our session and JWT
declare module 'next-auth' {
  // Defines the shape of the session object (doesn't include password)
  interface Session {
    user: {
      id?: string
      email?: string
      name?: string
      role?: 'user' | 'admin'  // Make the role type more specific
    }
  }

  interface User {
    id: string
    email: string
    name: string
    role?: 'user' | 'admin'
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    email: string
    name: string
    role?: 'user' | 'admin'
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error('No credentials provided')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error('Invalid email or password')
        }

        return { id: user.id, email: user.email, name: user.name || '', role: user.role as 'user' | 'admin' }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      session.user.email = token.email
      session.user.name = token.name
      session.user.role = token.role
      return session
    }
  }
}

export const auth = NextAuth(authConfig)