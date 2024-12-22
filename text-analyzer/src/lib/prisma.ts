import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined // This is a workaround to prevent Prisma from being undefined in the global scope
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma // globalThis helps to prevent TypeScript errors
}
