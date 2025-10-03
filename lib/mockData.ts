/**
 * Mock data for the Trusted Search Engine
 * This file contains comprehensive mock data representing various trusted sources
 */

import { SearchResult, SourceInfo, TrustedSource, SourceType, ContentType, TrustLevel } from '@/types/search';

// Mock trusted sources configuration
export const mockTrustedSources: TrustedSource[] = [
  {
    id: 'wikipedia',
    name: 'Wikipedia',
    baseUrl: 'https://en.wikipedia.org',
    type: 'wikipedia',
    apiEndpoint: 'https://en.wikipedia.org/api/rest_v1',
    crawlConfig: {
      respectRobotsTxt: true,
      rateLimit: 10,
      maxDepth: 3,
      allowedPaths: ['/wiki/'],
      excludedPaths: ['/wiki/Special:', '/wiki/Talk:']
    },
    authorityScore: 8.5,
    isActive: true,
    lastIndexed: new Date('2024-01-10')
  },
  {
    id: 'britannica',
    name: 'Encyclopedia Britannica',
    baseUrl: 'https://www.britannica.com',
    type: 'encyclopedia',
    crawlConfig: {
      respectRobotsTxt: true,
      rateLimit: 5,
      maxDepth: 2,
      allowedPaths: ['/topic/', '/biography/'],
      excludedPaths: ['/quiz/', '/games/']
    },
    authorityScore: 9.2,
    isActive: true,
    lastIndexed: new Date('2024-01-08')
  },
  {
    id: 'nature',
    name: 'Nature Journal',
    baseUrl: 'https://www.nature.com',
    type: 'academic',
    apiEndpoint: 'https://api.nature.com',
    crawlConfig: {
      respectRobotsTxt: true,
      rateLimit: 3,
      maxDepth: 2,
      allowedPaths: ['/articles/'],
      excludedPaths: ['/news/', '/opinion/']
    },
    authorityScore: 9.5,
    isActive: true,
    lastIndexed: new Date('2024-01-09')
  },
  {
    id: 'arxiv',
    name: 'arXiv',
    baseUrl: 'https://arxiv.org',
    type: 'academic',
    apiEndpoint: 'https://export.arxiv.org/api',
    crawlConfig: {
      respectRobotsTxt: true,
      rateLimit: 3,
      maxDepth: 1,
      allowedPaths: ['/abs/', '/pdf/'],
      excludedPaths: []
    },
    authorityScore: 8.8,
    isActive: true,
    lastIndexed: new Date('2024-01-11')
  },
  {
    id: 'nih',
    name: 'National Institutes of Health',
    baseUrl: 'https://www.nih.gov',
    type: 'government',
    crawlConfig: {
      respectRobotsTxt: true,
      rateLimit: 5,
      maxDepth: 3,
      allowedPaths: ['/health/', '/research/'],
      excludedPaths: ['/careers/', '/grants/']
    },
    authorityScore: 9.0,
    isActive: true,
    lastIndexed: new Date('2024-01-07')
  },
  {
    id: 'cdc',
    name: 'Centers for Disease Control',
    baseUrl: 'https://www.cdc.gov',
    type: 'government',
    crawlConfig: {
      respectRobotsTxt: true,
      rateLimit: 5,
      maxDepth: 3,
      allowedPaths: ['/health/', '/diseases/'],
      excludedPaths: ['/jobs/', '/media/']
    },
    authorityScore: 9.1,
    isActive: true,
    lastIndexed: new Date('2024-01-06')
  }
];

// Helper function to create source info from trusted source
const createSourceInfo = (trustedSource: TrustedSource): SourceInfo => ({
  id: trustedSource.id,
  name: trustedSource.name,
  type: trustedSource.type,
  domain: new URL(trustedSource.baseUrl).hostname,
  authorityScore: trustedSource.authorityScore,
  trustLevel: trustedSource.authorityScore >= 9.0 ? 'verified' : 
              trustedSource.authorityScore >= 8.5 ? 'high' : 'institutional'
});

// Comprehensive mock search results covering various topics and sources
export const mockSearchResults: SearchResult[] = [
  // Climate Change Results
  {
    id: 'climate-wiki-1',
    title: 'Climate Change - Wikipedia',
    snippet: 'Climate change refers to long-term shifts in global or regional climate patterns. Since the mid-20th century, humans have been the main driver of climate change, primarily due to fossil fuel burning, which increases heat-trapping greenhouse gas levels in Earth\'s atmosphere.',
    url: 'https://en.wikipedia.org/wiki/Climate_change',
    source: createSourceInfo(mockTrustedSources[0]), // Wikipedia
    relevanceScore: 0.95,
    publishedDate: new Date('2023-01-15'),
    lastUpdated: new Date('2024-01-10'),
    topics: ['Environment', 'Science', 'Global Warming', 'Greenhouse Gases'],
    contentType: 'article'
  },
  {
    id: 'climate-nature-1',
    title: 'Global Warming Acceleration in Recent Decades',
    snippet: 'Recent studies show accelerating trends in global temperature rise. This comprehensive analysis examines the latest climate data and projections for the coming decades, highlighting the urgent need for climate action.',
    url: 'https://nature.com/articles/climate-research-2024',
    source: createSourceInfo(mockTrustedSources[2]), // Nature
    relevanceScore: 0.88,
    publishedDate: new Date('2024-01-05'),
    lastUpdated: new Date('2024-01-05'),
    topics: ['Climate Science', 'Research', 'Temperature', 'Global Warming'],
    contentType: 'paper'
  },
  {
    id: 'climate-britannica-1',
    title: 'Global Warming | Definition, Causes, Effects',
    snippet: 'Global warming, the phenomenon of increasing average air temperatures near the surface of Earth over the past one to two centuries. Climate scientists have since the mid-20th century gathered detailed observations of various weather phenomena.',
    url: 'https://www.britannica.com/science/global-warming',
    source: createSourceInfo(mockTrustedSources[1]), // Britannica
    relevanceScore: 0.82,
    publishedDate: new Date('2023-06-20'),
    lastUpdated: new Date('2023-12-15'),
    topics: ['Environment', 'Science', 'Global Warming', 'Weather'],
    contentType: 'article'
  },

  // Artificial Intelligence Results
  {
    id: 'ai-wiki-1',
    title: 'Artificial Intelligence - Wikipedia',
    snippet: 'Artificial intelligence (AI) is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals. Leading AI textbooks define the field as the study of "intelligent agents".',
    url: 'https://en.wikipedia.org/wiki/Artificial_intelligence',
    source: createSourceInfo(mockTrustedSources[0]), // Wikipedia
    relevanceScore: 0.93,
    publishedDate: new Date('2023-03-10'),
    lastUpdated: new Date('2024-01-08'),
    topics: ['Technology', 'Computer Science', 'Machine Learning', 'AI'],
    contentType: 'article'
  },
  {
    id: 'ai-arxiv-1',
    title: 'Attention Is All You Need',
    snippet: 'The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism.',
    url: 'https://arxiv.org/abs/1706.03762',
    source: createSourceInfo(mockTrustedSources[3]), // arXiv
    relevanceScore: 0.91,
    publishedDate: new Date('2017-06-12'),
    lastUpdated: new Date('2017-06-12'),
    topics: ['Machine Learning', 'Neural Networks', 'Transformers', 'AI'],
    contentType: 'paper'
  },
  {
    id: 'ai-nature-1',
    title: 'Deep Learning Revolution in Scientific Research',
    snippet: 'Deep learning has transformed numerous scientific disciplines, from protein folding prediction to climate modeling. This review examines the current state and future prospects of AI in scientific discovery.',
    url: 'https://nature.com/articles/deep-learning-science-2024',
    source: createSourceInfo(mockTrustedSources[2]), // Nature
    relevanceScore: 0.87,
    publishedDate: new Date('2024-01-03'),
    lastUpdated: new Date('2024-01-03'),
    topics: ['AI', 'Deep Learning', 'Scientific Research', 'Technology'],
    contentType: 'paper'
  },

  // Health and Medicine Results
  {
    id: 'health-nih-1',
    title: 'Understanding COVID-19 Vaccines',
    snippet: 'COVID-19 vaccines help protect against COVID-19. Getting vaccinated is one of many steps you can take to protect yourself and others from COVID-19. Learn about the different types of vaccines and how they work.',
    url: 'https://www.nih.gov/health-information/covid-19-vaccines',
    source: createSourceInfo(mockTrustedSources[4]), // NIH
    relevanceScore: 0.94,
    publishedDate: new Date('2021-12-15'),
    lastUpdated: new Date('2023-11-20'),
    topics: ['Health', 'Vaccines', 'COVID-19', 'Medicine', 'Public Health'],
    contentType: 'document'
  },
  {
    id: 'health-cdc-1',
    title: 'Heart Disease Facts | CDC',
    snippet: 'Heart disease is the leading cause of death for men, women, and people of most racial and ethnic groups in the United States. Learn about heart disease risk factors, prevention, and treatment options.',
    url: 'https://www.cdc.gov/heartdisease/facts.htm',
    source: createSourceInfo(mockTrustedSources[5]), // CDC
    relevanceScore: 0.89,
    publishedDate: new Date('2023-05-10'),
    lastUpdated: new Date('2023-12-01'),
    topics: ['Health', 'Heart Disease', 'Prevention', 'Medicine', 'Public Health'],
    contentType: 'document'
  },
  {
    id: 'health-wiki-1',
    title: 'Medicine - Wikipedia',
    snippet: 'Medicine is the science and practice of caring for a patient, managing the diagnosis, prognosis, prevention, treatment, palliation of their injury or disease, and promoting their health.',
    url: 'https://en.wikipedia.org/wiki/Medicine',
    source: createSourceInfo(mockTrustedSources[0]), // Wikipedia
    relevanceScore: 0.85,
    publishedDate: new Date('2023-02-20'),
    lastUpdated: new Date('2023-12-10'),
    topics: ['Medicine', 'Health', 'Healthcare', 'Medical Science'],
    contentType: 'article'
  },

  // Physics and Science Results
  {
    id: 'physics-wiki-1',
    title: 'Quantum Mechanics - Wikipedia',
    snippet: 'Quantum mechanics is a fundamental theory in physics that provides a description of the physical properties of nature at the scale of atoms and subatomic particles. It is the foundation of all quantum physics.',
    url: 'https://en.wikipedia.org/wiki/Quantum_mechanics',
    source: createSourceInfo(mockTrustedSources[0]), // Wikipedia
    relevanceScore: 0.92,
    publishedDate: new Date('2023-04-05'),
    lastUpdated: new Date('2024-01-05'),
    topics: ['Physics', 'Quantum Mechanics', 'Science', 'Atoms'],
    contentType: 'article'
  },
  {
    id: 'physics-arxiv-1',
    title: 'Quantum Entanglement and Information Theory',
    snippet: 'We present a comprehensive review of quantum entanglement from an information-theoretic perspective. The paper covers recent developments in quantum information theory and their applications to quantum computing.',
    url: 'https://arxiv.org/abs/2401.12345',
    source: createSourceInfo(mockTrustedSources[3]), // arXiv
    relevanceScore: 0.88,
    publishedDate: new Date('2024-01-15'),
    lastUpdated: new Date('2024-01-15'),
    topics: ['Quantum Physics', 'Information Theory', 'Quantum Computing', 'Entanglement'],
    contentType: 'paper'
  },

  // History Results
  {
    id: 'history-britannica-1',
    title: 'World War II | Summary, Combatants, & Facts',
    snippet: 'World War II, conflict that involved virtually every part of the world during 1939–45. The principal belligerents were the Axis powers—Germany, Italy, and Japan—and the Allies—France, Great Britain, the United States, the Soviet Union, and China.',
    url: 'https://www.britannica.com/event/World-War-II',
    source: createSourceInfo(mockTrustedSources[1]), // Britannica
    relevanceScore: 0.96,
    publishedDate: new Date('2023-01-01'),
    lastUpdated: new Date('2023-09-15'),
    topics: ['History', 'World War II', 'Military History', 'Global Conflict'],
    contentType: 'article'
  },
  {
    id: 'history-wiki-1',
    title: 'Ancient Rome - Wikipedia',
    snippet: 'Ancient Rome was a civilization that began as a city-state on the Italian Peninsula during the 8th century BC. Located along the Mediterranean Sea, it became one of the largest empires in the ancient world.',
    url: 'https://en.wikipedia.org/wiki/Ancient_Rome',
    source: createSourceInfo(mockTrustedSources[0]), // Wikipedia
    relevanceScore: 0.90,
    publishedDate: new Date('2023-07-12'),
    lastUpdated: new Date('2023-11-30'),
    topics: ['History', 'Ancient Rome', 'Civilization', 'Empire'],
    contentType: 'article'
  },

  // Technology Results
  {
    id: 'tech-wiki-1',
    title: 'Blockchain - Wikipedia',
    snippet: 'A blockchain is a distributed ledger with growing lists of records, called blocks, that are linked and secured using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data.',
    url: 'https://en.wikipedia.org/wiki/Blockchain',
    source: createSourceInfo(mockTrustedSources[0]), // Wikipedia
    relevanceScore: 0.87,
    publishedDate: new Date('2023-08-20'),
    lastUpdated: new Date('2023-12-20'),
    topics: ['Technology', 'Blockchain', 'Cryptocurrency', 'Distributed Systems'],
    contentType: 'article'
  },
  {
    id: 'tech-nature-1',
    title: 'Quantum Computing Breakthrough in Error Correction',
    snippet: 'Researchers demonstrate significant progress in quantum error correction, bringing practical quantum computers closer to reality. The study shows improved qubit stability and error rates in quantum processors.',
    url: 'https://nature.com/articles/quantum-computing-2024',
    source: createSourceInfo(mockTrustedSources[2]), // Nature
    relevanceScore: 0.84,
    publishedDate: new Date('2024-01-12'),
    lastUpdated: new Date('2024-01-12'),
    topics: ['Quantum Computing', 'Technology', 'Error Correction', 'Research'],
    contentType: 'paper'
  }
];

// Mock search suggestions based on common queries
export const mockSearchSuggestions: Record<string, string[]> = {
  'climate': [
    'climate change',
    'climate change effects',
    'climate change solutions',
    'climate change causes',
    'climate science'
  ],
  'artificial': [
    'artificial intelligence',
    'artificial neural networks',
    'artificial intelligence applications',
    'artificial intelligence ethics',
    'artificial intelligence history'
  ],
  'quantum': [
    'quantum mechanics',
    'quantum computing',
    'quantum physics',
    'quantum entanglement',
    'quantum theory'
  ],
  'health': [
    'health care',
    'health insurance',
    'mental health',
    'public health',
    'health benefits'
  ],
  'covid': [
    'covid 19',
    'covid vaccine',
    'covid symptoms',
    'covid treatment',
    'covid prevention'
  ],
  'medicine': [
    'medicine definition',
    'medicine history',
    'medicine types',
    'preventive medicine',
    'traditional medicine'
  ],
  'history': [
    'world history',
    'american history',
    'ancient history',
    'history timeline',
    'historical events'
  ],
  'technology': [
    'technology trends',
    'information technology',
    'technology news',
    'emerging technology',
    'technology impact'
  ]
};

// Function to get mock suggestions based on partial query
export function getMockSuggestions(partialQuery: string, limit: number = 5): string[] {
  const query = partialQuery.toLowerCase().trim();
  
  if (query.length < 2) return [];
  
  const allSuggestions: string[] = [];
  
  // Find suggestions that start with or contain the query
  Object.entries(mockSearchSuggestions).forEach(([key, suggestions]) => {
    if (key.startsWith(query)) {
      allSuggestions.push(...suggestions);
    } else {
      const matchingSuggestions = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(query)
      );
      allSuggestions.push(...matchingSuggestions);
    }
  });
  
  // Remove duplicates and limit results
  return [...new Set(allSuggestions)].slice(0, limit);
}

// Function to search mock results
export function searchMockResults(
  query: string,
  limit: number = 10,
  offset: number = 0
): { results: SearchResult[]; totalCount: number } {
  if (!query.trim()) {
    return { results: [], totalCount: 0 };
  }
  
  const searchTerm = query.toLowerCase();
  
  // Filter results based on query matching title, snippet, or topics
  const filteredResults = mockSearchResults.filter(result => {
    const titleMatch = result.title.toLowerCase().includes(searchTerm);
    const snippetMatch = result.snippet.toLowerCase().includes(searchTerm);
    const topicMatch = result.topics.some(topic => 
      topic.toLowerCase().includes(searchTerm)
    );
    const sourceMatch = result.source.name.toLowerCase().includes(searchTerm);
    
    return titleMatch || snippetMatch || topicMatch || sourceMatch;
  });
  
  // Sort by relevance score (descending)
  filteredResults.sort((a, b) => b.relevanceScore - a.relevanceScore);
  
  // Apply pagination
  const paginatedResults = filteredResults.slice(offset, offset + limit);
  
  return {
    results: paginatedResults,
    totalCount: filteredResults.length
  };
}