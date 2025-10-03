/**
 * Utility functions for search filters
 */

import { FilterOptions, SourceType, ContentType } from '@/types/search';
import { mockSearchResults, mockTrustedSources } from '@/lib/mockData';

/**
 * Generate filter options from available data
 */
export function generateFilterOptions(): FilterOptions {
  // Get unique source types from trusted sources
  const availableSourceTypes = Array.from(
    new Set(mockTrustedSources.map(source => source.type))
  ) as SourceType[];

  // Get unique content types from search results
  const availableContentTypes = Array.from(
    new Set(mockSearchResults.map(result => result.contentType))
  ) as ContentType[];

  // Get unique topics from search results
  const allTopics = mockSearchResults.flatMap(result => result.topics);
  const availableTopics = Array.from(new Set(allTopics)).sort();

  // Calculate date range from search results
  const dates = mockSearchResults
    .map(result => result.publishedDate)
    .filter((date): date is Date => date !== undefined)
    .map(date => new Date(date));

  const minDate = dates.length > 0 ? new Date(Math.min(...dates.map(d => d.getTime()))) : new Date('2000-01-01');
  const maxDate = dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))) : new Date();

  return {
    availableSourceTypes,
    availableContentTypes,
    availableTopics,
    dateRange: {
      min: minDate,
      max: maxDate
    }
  };
}

/**
 * Convert filters to URL search parameters
 */
export function filtersToUrlParams(filters: Record<string, any>): URLSearchParams {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value) && value.length > 0) {
        params.set(key, JSON.stringify(value));
      } else if (typeof value === 'object' && value.start && value.end) {
        // Handle date range
        params.set(key, JSON.stringify({
          start: value.start.toISOString(),
          end: value.end.toISOString()
        }));
      } else if (typeof value !== 'object') {
        params.set(key, value.toString());
      }
    }
  });
  
  return params;
}

/**
 * Parse filters from URL search parameters
 */
export function urlParamsToFilters(searchParams: URLSearchParams): Record<string, any> {
  const filters: Record<string, any> = {};
  
  for (const [key, value] of searchParams.entries()) {
    if (key === 'q' || key === 'page' || key === 'limit') {
      continue; // Skip non-filter parameters
    }
    
    try {
      // Try to parse as JSON first (for arrays and objects)
      const parsed = JSON.parse(value);
      
      if (key === 'dateRange' && parsed.start && parsed.end) {
        filters[key] = {
          start: new Date(parsed.start),
          end: new Date(parsed.end)
        };
      } else {
        filters[key] = parsed;
      }
    } catch {
      // If JSON parsing fails, treat as string/number
      if (!isNaN(Number(value))) {
        filters[key] = Number(value);
      } else {
        filters[key] = value;
      }
    }
  }
  
  return filters;
}

/**
 * Check if filters object has any active filters
 */
export function hasActiveFilters(filters: Record<string, any>): boolean {
  return Object.values(filters).some(value => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined && value !== null && value !== '';
  });
}

/**
 * Get a human-readable description of active filters
 */
export function getFilterDescription(filters: Record<string, any>): string {
  const descriptions: string[] = [];
  
  if (filters.sourceTypes && Array.isArray(filters.sourceTypes) && filters.sourceTypes.length > 0) {
    descriptions.push(`Sources: ${filters.sourceTypes.join(', ')}`);
  }
  
  if (filters.contentTypes && Array.isArray(filters.contentTypes) && filters.contentTypes.length > 0) {
    descriptions.push(`Content: ${filters.contentTypes.join(', ')}`);
  }
  
  if (filters.topics && Array.isArray(filters.topics) && filters.topics.length > 0) {
    const topicList = filters.topics.length > 3 
      ? `${filters.topics.slice(0, 3).join(', ')} +${filters.topics.length - 3} more`
      : filters.topics.join(', ');
    descriptions.push(`Topics: ${topicList}`);
  }
  
  if (filters.dateRange && filters.dateRange.start && filters.dateRange.end) {
    const startDate = new Date(filters.dateRange.start).toLocaleDateString();
    const endDate = new Date(filters.dateRange.end).toLocaleDateString();
    descriptions.push(`Date: ${startDate} - ${endDate}`);
  }
  
  if (filters.minAuthorityScore && filters.minAuthorityScore > 0) {
    descriptions.push(`Min Authority: ${filters.minAuthorityScore.toFixed(1)}`);
  }
  
  return descriptions.join(' • ');
}