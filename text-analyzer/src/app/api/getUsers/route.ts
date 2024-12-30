
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // get all users except admin: 
    const users = await prisma.user.findMany({
      where: { role: { not: 'admin' } },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    })

    return NextResponse.json({
      users,
      count: users.length
    }, { status: 200 });
  }
  catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}