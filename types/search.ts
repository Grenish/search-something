/**
 * Core data models for the Trusted Search Engine
 */

export type SourceType = 'wikipedia' | 'academic' | 'government' | 'encyclopedia';
export type ContentType = 'article' | 'paper' | 'document' | 'page';
export type TrustLevel = 'high' | 'verified' | 'institutional';

export interface SourceInfo {
  id: string;
  name: string;
  type: SourceType;
  domain: string;
  authorityScore: number;
  trustLevel: TrustLevel;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url: string;
  source: SourceInfo;
  relevanceScore: number;
  publishedDate?: Date;
  lastUpdated: Date;
  topics: string[];
  contentType: ContentType;
}

export interface SearchFilters {
  sourceTypes?: SourceType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  topics?: string[];
  contentTypes?: ContentType[];
  minAuthorityScore?: number;
}

export interface CrawlConfig {
  respectRobotsTxt: boolean;
  rateLimit: number; // requests per second
  maxDepth: number;
  allowedPaths?: string[];
  excludedPaths?: string[];
}

export interface TrustedSource {
  id: string;
  name: string;
  baseUrl: string;
  type: SourceType;
  apiEndpoint?: string;
  crawlConfig: CrawlConfig;
  authorityScore: number;
  isActive: boolean;
  lastIndexed?: Date;
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  query: string;
  filters: SearchFilters;
  searchTime: number; // milliseconds
}

export interface FilterOptions {
  availableSourceTypes: SourceType[];
  availableTopics: string[];
  availableContentTypes: ContentType[];
  dateRange: {
    min: Date;
    max: Date;
  };
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  authorityScore?: number;
}

export interface IndexStatus {
  totalSources: number;
  activeSources: number;
  lastIndexed: Date;
  indexingInProgress: boolean;
  totalDocuments: number;
  indexHealth: 'healthy' | 'degraded' | 'unhealthy';
}