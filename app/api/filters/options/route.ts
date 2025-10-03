import { NextResponse } from 'next/server';
import { generateFilterOptions } from '@/utils/filterUtils';

export async function GET() {
  try {
    const filterOptions = generateFilterOptions();
    
    return NextResponse.json({
      success: true,
      data: filterOptions
    });
  } catch (error) {
    console.error('Filter options API error:', error);
    
    return NextResponse.json(
      {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'Failed to generate filter options',
          timestamp: new Date().toISOString(),
          requestId: crypto.randomUUID()
        }
      },
      { status: 500 }
    );
  }
}