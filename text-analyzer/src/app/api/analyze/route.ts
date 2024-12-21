import { NextResponse } from 'next/server'
import { analyzeText } from '../../../utils/textAnalysis'

export async function POST(request:Request)
{
  try {
    // Getting the text from the request body
    const { text } = await request.json()

    if (!text || typeof text !== 'string') 
    {
      return NextResponse.json(
        { error : 'Text is required' },
        { status: 400 } 
      )
    }

    // Perform the analsyis using the tool we made
    const result = analyzeText(text)

    return NextResponse.json(result)
  }
  catch (error) {
    return NextResponse.json(
      { error: 'Failed to analyze text' },
      { status: 500 }
    )
  }
}