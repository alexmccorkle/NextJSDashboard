import { NextResponse } from 'next/server'
import { analyzeText } from '../../../utils/textAnalysis'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { convertResultToAnalysisData } from '@/types/analysis'
import { authConfig } from '@/auth'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig)

    if (!session?.user?.id) 
    {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Getting the text from the request body
    const { text } = await request.json()

    if (!text || typeof text !== 'string') 
    {
      return NextResponse.json(
        { error : 'Text is required' },
        { status: 400 } 
      )
    }

    // Perform the analsyis
    const result = analyzeText(text)

    const analysisData = convertResultToAnalysisData(result, text)

    const existingAnalysis = await prisma.analysis.findFirst({
      where: {
        userId: session.user.id,
        ...analysisData 
      }
    })

    if (existingAnalysis) {
      console.log('--- Analysis already exists in db')
      return NextResponse.json(result)
    }

    // save to db
    await prisma.analysis.create({
      data: {
        ...analysisData,
        userId: session.user.id
      }
    })
    console.log('--- Analysis saved to db')

    return NextResponse.json(result)
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze text' },
      { status: 500 }
    )
  }
}


export async function GET() {
  try {
    const session = await getServerSession(authConfig)

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 })
        }
    
    const analysis = await prisma.analysis.findMany({
    where: {
      userId: session.user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
    })

    return NextResponse.json(analysis)
    }
    catch (error) {
      return NextResponse.json(
        { error: 'Failed to fetch analysis' },
        { status: 500 }
      )
    }
  }
