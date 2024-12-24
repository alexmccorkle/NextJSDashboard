// src/app/api/auth/[...nextauth]/route.ts
import { auth } from '@/auth'

// The GET and POST handlers are built into the auth object
export { auth as GET, auth as POST }