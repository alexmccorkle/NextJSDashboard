import NextAuth from 'next-auth'
import type { NextAuthConfig, Session, User } from '@auth/core/types'
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
    role?: 'user' | 'admin'
    id?: string
  }
}

// Defines the shape of the user object in the database
interface DatabaseUser {
  id: string
  email: string
  name: string
  password: string
  role: 'user' | 'admin'
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('Missing credentials')
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          }) as DatabaseUser | null

          if (!user) {
            throw new Error('User not found')
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isPasswordValid) {
            throw new Error('Invalid password')
          }

          // Return only the data we want to expose
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: { strategy: "jwt" },
  callbacks: {
    // Improve type safety in callbacks
    async jwt({ token, user }: {
      token: NextAuthJWT;
      user?: DatabaseUser | null
    }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: {
      session: Session;
      token: NextAuthJWT }) {
      if (session?.user) {
        session.user.id = token.id as string
        session.user.role = token.role
      }
      return session
    }
  }
}

export const auth = NextAuth(authConfig)