import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { Session } from 'next-auth'
import { authConfig } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Tell TS that the session will match our Session type
    const session = await getServerSession(authConfig) as Session | null
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' }, 
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        // Never select the password field
      },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' }, 
        { status: 404 }
      )
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error fetching user data:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}