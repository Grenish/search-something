/**
 * Application constants for the Trusted Search Engine
 */

export const SEARCH_CONSTANTS = {
  // Pagination
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50,
  
  // Search limits
  MAX_QUERY_LENGTH: 500,
  MIN_QUERY_LENGTH: 1,
  
  // Timeouts (milliseconds)
  SEARCH_TIMEOUT: 5000,
  INDEXING_TIMEOUT: 30000,
  
  // Scoring
  MIN_RELEVANCE_SCORE: 0.1,
  MAX_AUTHORITY_SCORE: 1.0,
  
  // Cache keys
  CACHE_KEYS: {
    SEARCH_RESULTS: 'search:results',
    SUGGESTIONS: 'search:suggestions',
    RELATED_QUERIES: 'search:related',
    SOURCE_STATUS: 'sources:status',
  },
} as const;

export const SOURCE_TYPES = {
  WIKIPEDIA: 'wikipedia',
  ACADEMIC: 'academic',
  GOVERNMENT: 'government',
  ENCYCLOPEDIA: 'encyclopedia',
} as const;

export const CONTENT_TYPES = {
  ARTICLE: 'article',
  PAPER: 'paper',
  DOCUMENT: 'document',
  PAGE: 'page',
} as const;

export const TRUST_LEVELS = {
  HIGH: 'high',
  VERIFIED: 'verified',
  INSTITUTIONAL: 'institutional',
} as const;

export const ERROR_CODES = {
  // Search errors
  SEARCH_FAILED: 'SEARCH_FAILED',
  INVALID_QUERY: 'INVALID_QUERY',
  NO_RESULTS: 'NO_RESULTS',
  
  // Source errors
  SOURCE_UNAVAILABLE: 'SOURCE_UNAVAILABLE',
  INVALID_SOURCE: 'INVALID_SOURCE',
  SOURCE_RATE_LIMITED: 'SOURCE_RATE_LIMITED',
  
  // System errors
  DATABASE_ERROR: 'DATABASE_ERROR',
  CACHE_ERROR: 'CACHE_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
} as const;