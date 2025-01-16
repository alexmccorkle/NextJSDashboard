import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authConfig } from '@/auth'

export async function PUT(request: Request) {
  try {
    // Check if user authenticated + admin
    const session = await getServerSession(authConfig)
    const isAdmin = session?.user.role === 'admin'  

    // check if not logged or not admin
    if (!session?.user?.email || !isAdmin) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    // if we get here, that means the user is authenticated and is an admin
    const { analysisId, flag } = await request.json()

    if (!analysisId || !flag || !["human", "ai"].includes(flag)) {
      return new NextResponse("Invalid data", {status: 400});
    }

    // update flag in db
    const updatedAnalysis = await prisma.analysis.update({
      where: { id: analysisId },
      data: { flag },
    });

    return NextResponse.json(updatedAnalysis);
  } catch (error) {
    console.error ("Error updating flag in db: ", error)
    return new NextResponse("Internal Server Error", {status: 500});
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }

) {
  try {
    const session = await getServerSession(authConfig)

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", {status: 401});
    }

    const analysisId = params.id;

    if (!analysisId) {
      return new NextResponse("Analysis ID is required", {status: 400});
    }

    const analysis = await prisma.analysis.findUnique({
      where: { id: analysisId },
      select: { flag: true },
    });

    if (!analysis) {
      return new NextResponse("Analysis not found", {status: 404});
    }

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error fetching analysis flag: ", error);
    return new NextResponse(
      "Internal Server Error", 
      {status: 500}
    );
  };
}