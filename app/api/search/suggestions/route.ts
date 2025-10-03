import { NextRequest, NextResponse } from 'next/server';
import { getMockSuggestions } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const query = searchParams.get('q') || '';
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    
    // Validate parameters
    if (limit < 1 || limit > 20) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_LIMIT',
            message: 'Limit must be between 1 and 20',
            timestamp: new Date().toISOString(),
            requestId: crypto.randomUUID()
          }
        },
        { status: 400 }
      );
    }
    
    // Get suggestions
    const suggestions = getMockSuggestions(query, limit);
    
    // Simulate small network delay
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    
    return NextResponse.json({
      suggestions,
      query,
      count: suggestions.length
    });
    
  } catch (error) {
    console.error('Suggestions API error:', error);
    
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An internal server error occurred',
          timestamp: new Date().toISOString(),
          requestId: crypto.randomUUID()
        }
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function POST() {
  return NextResponse.json(
    {
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'POST method not supported for suggestions endpoint',
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    },
    { status: 405 }
  );
}