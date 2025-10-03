import { NextRequest, NextResponse } from 'next/server';
import { SearchResponse, SearchFilters } from '@/types/search';
import { searchMockResults } from '@/lib/mockData';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const filtersParam = searchParams.get('filters');
    
    // Validate parameters
    if (!query.trim()) {
      return NextResponse.json(
        {
          error: {
            code: 'MISSING_QUERY',
            message: 'Search query is required',
            timestamp: new Date().toISOString(),
            requestId: crypto.randomUUID()
          }
        },
        { status: 400 }
      );
    }
    
    if (page < 1 || limit < 1 || limit > 50) {
      return NextResponse.json(
        {
          error: {
            code: 'INVALID_PARAMETERS',
            message: 'Invalid page or limit parameters',
            timestamp: new Date().toISOString(),
            requestId: crypto.randomUUID()
          }
        },
        { status: 400 }
      );
    }
    
    // Parse filters from URL parameters
    let filters: SearchFilters = {};
    
    // Handle legacy filters parameter (JSON string)
    if (filtersParam) {
      try {
        filters = JSON.parse(filtersParam);
      } catch (error) {
        return NextResponse.json(
          {
            error: {
              code: 'INVALID_FILTERS',
              message: 'Invalid filters format',
              timestamp: new Date().toISOString(),
              requestId: crypto.randomUUID()
            }
          },
          { status: 400 }
        );
      }
    } else {
      // Parse individual filter parameters
      const sourceTypesParam = searchParams.get('sourceTypes');
      const contentTypesParam = searchParams.get('contentTypes');
      const topicsParam = searchParams.get('topics');
      const dateRangeParam = searchParams.get('dateRange');
      const minAuthorityScoreParam = searchParams.get('minAuthorityScore');
      
      if (sourceTypesParam) {
        try {
          filters.sourceTypes = JSON.parse(sourceTypesParam);
        } catch (error) {
          console.warn('Invalid sourceTypes parameter:', error);
        }
      }
      
      if (contentTypesParam) {
        try {
          filters.contentTypes = JSON.parse(contentTypesParam);
        } catch (error) {
          console.warn('Invalid contentTypes parameter:', error);
        }
      }
      
      if (topicsParam) {
        try {
          filters.topics = JSON.parse(topicsParam);
        } catch (error) {
          console.warn('Invalid topics parameter:', error);
        }
      }
      
      if (dateRangeParam) {
        try {
          const dateRange = JSON.parse(dateRangeParam);
          if (dateRange.start && dateRange.end) {
            filters.dateRange = {
              start: new Date(dateRange.start),
              end: new Date(dateRange.end)
            };
          }
        } catch (error) {
          console.warn('Invalid dateRange parameter:', error);
        }
      }
      
      if (minAuthorityScoreParam) {
        const score = parseFloat(minAuthorityScoreParam);
        if (!isNaN(score)) {
          filters.minAuthorityScore = score;
        }
      }
    }
    
    // Calculate offset for pagination
    const offset = (page - 1) * limit;
    
    // Simulate network delay for realistic experience
    await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 500));
    
    // Search mock results
    const { results, totalCount } = searchMockResults(query, limit, offset);
    
    // Apply filters if provided (basic implementation)
    let filteredResults = results;
    
    if (filters.sourceTypes && filters.sourceTypes.length > 0) {
      filteredResults = filteredResults.filter(result =>
        filters.sourceTypes!.includes(result.source.type)
      );
    }
    
    if (filters.contentTypes && filters.contentTypes.length > 0) {
      filteredResults = filteredResults.filter(result =>
        filters.contentTypes!.includes(result.contentType)
      );
    }
    
    if (filters.minAuthorityScore) {
      filteredResults = filteredResults.filter(result =>
        result.source.authorityScore >= filters.minAuthorityScore!
      );
    }
    
    if (filters.dateRange) {
      filteredResults = filteredResults.filter(result => {
        if (!result.publishedDate) return false;
        const publishedDate = new Date(result.publishedDate);
        const startDate = new Date(filters.dateRange!.start);
        const endDate = new Date(filters.dateRange!.end);
        return publishedDate >= startDate && publishedDate <= endDate;
      });
    }
    
    if (filters.topics && filters.topics.length > 0) {
      filteredResults = filteredResults.filter(result =>
        result.topics.some(topic =>
          filters.topics!.some(filterTopic =>
            topic.toLowerCase().includes(filterTopic.toLowerCase())
          )
        )
      );
    }
    
    // Recalculate total count after filtering
    const filteredTotalCount = filteredResults.length;
    const totalPages = Math.ceil(filteredTotalCount / limit);
    
    // Build response
    const response: SearchResponse = {
      results: filteredResults,
      totalCount: filteredTotalCount,
      currentPage: page,
      totalPages,
      query,
      filters,
      searchTime: 300 + Math.random() * 500 // Mock search time in milliseconds
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Search API error:', error);
    
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
        message: 'POST method not supported for search endpoint',
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    {
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'PUT method not supported for search endpoint',
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    {
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'DELETE method not supported for search endpoint',
        timestamp: new Date().toISOString(),
        requestId: crypto.randomUUID()
      }
    },
    { status: 405 }
  );
}