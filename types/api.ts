/**
 * API-related types for the Trusted Search Engine
 */

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: any;
    timestamp: string;
    requestId: string;
  };
}

export interface ApiResponse<T> {
  data?: T;
  error?: ErrorResponse['error'];
  success: boolean;
}

export interface SearchApiParams {
  q: string;
  page?: number;
  limit?: number;
  filters?: string; // JSON stringified SearchFilters
}

export interface SuggestionsApiParams {
  q: string;
  limit?: number;
}

export interface RelatedQueriesApiParams {
  q: string;
  limit?: number;
}

export interface AdminSourceRequest {
  name: string;
  baseUrl: string;
  type: string;
  apiEndpoint?: string;
  crawlConfig: {
    respectRobotsTxt: boolean;
    rateLimit: number;
    maxDepth: number;
    allowedPaths?: string[];
    excludedPaths?: string[];
  };
  authorityScore: number;
}

export interface ReindexRequest {
  sourceId?: string; // If not provided, reindex all sources
  force?: boolean; // Force reindex even if recently indexed
}