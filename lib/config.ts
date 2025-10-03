/**
 * Configuration management for the Trusted Search Engine
 */

export const config = {
  // Database
  database: {
    url: process.env.DATABASE_URL || '',
    maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
  },
  
  // Redis Cache
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  
  // Elasticsearch
  elasticsearch: {
    url: process.env.ELASTICSEARCH_URL || 'http://localhost:9200',
    username: process.env.ELASTICSEARCH_USERNAME || '',
    password: process.env.ELASTICSEARCH_PASSWORD || '',
    indexName: process.env.ELASTICSEARCH_INDEX_NAME || 'trusted-search',
  },
  
  // Vector Database (Pinecone)
  pinecone: {
    apiKey: process.env.PINECONE_API_KEY || '',
    environment: process.env.PINECONE_ENVIRONMENT || '',
    indexName: process.env.PINECONE_INDEX_NAME || 'trusted-search-embeddings',
  },
  
  // AI/ML APIs
  ai: {
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
  },
  
  // External APIs
  externalApis: {
    wikipedia: {
      baseUrl: process.env.WIKIPEDIA_API_URL || 'https://en.wikipedia.org/api/rest_v1',
    },
    arxiv: {
      baseUrl: process.env.ARXIV_API_URL || 'http://export.arxiv.org/api/query',
    },
  },
  
  // Application
  app: {
    nodeEnv: process.env.NODE_ENV || 'development',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    port: parseInt(process.env.PORT || '3000'),
  },
  
  // Rate Limiting
  rateLimit: {
    requestsPerMinute: parseInt(process.env.RATE_LIMIT_REQUESTS_PER_MINUTE || '100'),
  },
  
  // Indexing
  indexing: {
    batchSize: parseInt(process.env.INDEXING_BATCH_SIZE || '100'),
    concurrentJobs: parseInt(process.env.INDEXING_CONCURRENT_JOBS || '5'),
  },
  
  // Cache TTL (in seconds)
  cache: {
    searchResults: parseInt(process.env.CACHE_TTL_SEARCH_RESULTS || '300'),
    suggestions: parseInt(process.env.CACHE_TTL_SUGGESTIONS || '3600'),
  },
  
  // Security
  security: {
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
    adminApiKey: process.env.ADMIN_API_KEY || '',
  },
  
  // Monitoring
  monitoring: {
    sentryDsn: process.env.SENTRY_DSN || '',
    vercelAnalyticsId: process.env.VERCEL_ANALYTICS_ID || '',
  },
} as const;

// Validation function to check required environment variables
export function validateConfig(): { isValid: boolean; missingVars: string[] } {
  const requiredVars = [
    'DATABASE_URL',
    'ELASTICSEARCH_URL',
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  return {
    isValid: missingVars.length === 0,
    missingVars,
  };
}

// Development mode check
export const isDevelopment = config.app.nodeEnv === 'development';
export const isProduction = config.app.nodeEnv === 'production';