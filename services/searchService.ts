/**
 * Search service for handling API calls to the search endpoints
 */

import { SearchResponse, SearchFilters } from '@/types/search';
import { ApiResponse } from '@/types/api';

export class SearchService {
  private static readonly BASE_URL = '/api/search';
  
  /**
   * Perform a search query
   */
  static async search(
    query: string,
    options: {
      page?: number;
      limit?: number;
      filters?: SearchFilters;
    } = {}
  ): Promise<SearchResponse> {
    const { page = 1, limit = 10, filters } = options;
    
    // Build query parameters
    const params = new URLSearchParams({
      q: query,
      page: page.toString(),
      limit: limit.toString()
    });
    
    // Add filters if provided
    if (filters && Object.keys(filters).length > 0) {
      params.append('filters', JSON.stringify(filters));
    }
    
    try {
      const response = await fetch(`${this.BASE_URL}?${params.toString()}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Search request failed');
      }
      
      const data: SearchResponse = await response.json();
      return data;
      
    } catch (error) {
      console.error('Search service error:', error);
      throw error instanceof Error ? error : new Error('Unknown search error');
    }
  }
  
  /**
   * Get search suggestions
   */
  static async getSuggestions(
    partialQuery: string,
    limit: number = 5
  ): Promise<string[]> {
    if (!partialQuery.trim() || partialQuery.length < 2) {
      return [];
    }
    
    const params = new URLSearchParams({
      q: partialQuery,
      limit: limit.toString()
    });
    
    try {
      const response = await fetch(`${this.BASE_URL}/suggestions?${params.toString()}`);
      
      if (!response.ok) {
        console.warn('Suggestions request failed, returning empty array');
        return [];
      }
      
      const data = await response.json();
      return data.suggestions || [];
      
    } catch (error) {
      console.warn('Suggestions service error:', error);
      return [];
    }
  }
  
  /**
   * Get related queries (placeholder for future implementation)
   */
  static async getRelatedQueries(
    query: string,
    limit: number = 5
  ): Promise<string[]> {
    // This would be implemented when the related queries API is available
    // For now, return empty array
    return [];
  }
  
  /**
   * Validate search query
   */
  static validateQuery(query: string): { isValid: boolean; error?: string } {
    if (!query || typeof query !== 'string') {
      return { isValid: false, error: 'Query must be a non-empty string' };
    }
    
    const trimmedQuery = query.trim();
    
    if (trimmedQuery.length === 0) {
      return { isValid: false, error: 'Query cannot be empty' };
    }
    
    if (trimmedQuery.length > 500) {
      return { isValid: false, error: 'Query is too long (maximum 500 characters)' };
    }
    
    return { isValid: true };
  }
  
  /**
   * Build search URL for sharing or bookmarking
   */
  static buildSearchUrl(query: string, filters?: SearchFilters): string {
    const params = new URLSearchParams({ q: query });
    
    if (filters && Object.keys(filters).length > 0) {
      params.append('filters', JSON.stringify(filters));
    }
    
    return `/?${params.toString()}`;
  }
}