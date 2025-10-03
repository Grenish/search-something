'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { SearchFilters, SearchResult, SearchResponse, FilterOptions } from '@/types/search';
import { SearchResults } from './SearchResults';
import { FilterPanel } from './FilterPanel';
import { SearchService } from '@/services/searchService';
import { generateFilterOptions, filtersToUrlParams, urlParamsToFilters, hasActiveFilters, getFilterDescription } from '@/utils/filterUtils';

interface SearchInterfaceProps {
  initialQuery?: string;
  initialFilters?: SearchFilters;
  onSearch?: (query: string, filters?: SearchFilters) => void;
}

export function SearchInterface({ 
  initialQuery = '', 
  initialFilters = {},
  onSearch 
}: SearchInterfaceProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTime, setSearchTime] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filterOptions] = useState<FilterOptions>(generateFilterOptions());
  
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Update URL when search is performed
  const updateUrl = useCallback((searchQuery: string, searchFilters?: SearchFilters) => {
    const params = new URLSearchParams();
    
    if (searchQuery.trim()) {
      params.set('q', searchQuery);
    }
    
    if (searchFilters && Object.keys(searchFilters).length > 0) {
      const filterParams = filtersToUrlParams(searchFilters);
      filterParams.forEach((value, key) => {
        params.set(key, value);
      });
    }
    
    const newUrl = params.toString() ? `/?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });
  }, [router]);

  // Handle search submission
  const handleSearch = useCallback(async (searchQuery: string = query, page: number = 1, searchFilters: SearchFilters = filters) => {
    const validation = SearchService.validateQuery(searchQuery);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid query');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);
    
    try {
      const startTime = Date.now();
      const response: SearchResponse = await SearchService.search(searchQuery, {
        page,
        limit: 10,
        filters: searchFilters
      });
      
      setResults(response.results);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      setCurrentPage(response.currentPage);
      setSearchTime(Date.now() - startTime);
      setHasSearched(true);
      
      // Update URL with search query and filters
      updateUrl(searchQuery, searchFilters);
      
      // Call external search handler if provided
      onSearch?.(searchQuery, searchFilters);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search. Please try again.';
      setError(errorMessage);
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [query, filters, onSearch, updateUrl]);

  // Handle input changes and suggestions
  const handleInputChange = useCallback(async (value: string) => {
    setQuery(value);
    
    if (value.trim().length > 2) {
      try {
        const suggestions = await SearchService.getSuggestions(value, 5);
        setSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
      } catch (error) {
        console.warn('Failed to fetch suggestions:', error);
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  }, []);

  // Perform initial search if query is provided
  useEffect(() => {
    if (initialQuery.trim() && !hasSearched) {
      handleSearch(initialQuery, 1, filters);
    }
  }, [initialQuery, hasSearched, handleSearch, filters]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    handleSearch(suggestion, 1, filters);
  };

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    if (hasSearched && query.trim()) {
      handleSearch(query, 1, newFilters);
    }
  }, [hasSearched, query, handleSearch]);

  // Initialize filters from URL parameters
  useEffect(() => {
    const urlFilters = urlParamsToFilters(searchParams);
    if (Object.keys(urlFilters).length > 0) {
      setFilters(urlFilters);
    }
  }, [searchParams]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation for suggestions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0 && query.trim().length > 2) {
                setShowSuggestions(true);
              }
            }}
            placeholder="Search trusted sources..."
            className="w-full px-4 py-3 pr-12 text-lg border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isLoading}
          />
          
          {/* Search button */}
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
          >
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg text-gray-900 dark:text-gray-100"
              >
                <span className="text-gray-400 dark:text-gray-500 mr-2">🔍</span>
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </form>

      {/* Filter Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${
              showFilters
                ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {hasActiveFilters(filters) && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                {Object.values(filters).filter(v => Array.isArray(v) ? v.length > 0 : v !== undefined).length}
              </span>
            )}
          </button>
          
          {hasActiveFilters(filters) && (
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {getFilterDescription(filters)}
            </div>
          )}
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mb-6">
          <FilterPanel
            filters={filters}
            onFiltersChange={handleFiltersChange}
            filterOptions={filterOptions}
            isVisible={showFilters}
            onToggle={() => setShowFilters(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex gap-6">
        {/* Search Results */}
        <div className="flex-1">
          {(hasSearched || isLoading) && (
            <SearchResults
              results={results}
              totalCount={totalCount}
              currentPage={currentPage}
              totalPages={totalPages}
              isLoading={isLoading}
              error={error}
              query={query}
              searchTime={searchTime}
            />
          )}

          {/* Initial state message */}
          {!hasSearched && !isLoading && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
                Search Trusted Sources
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Find reliable information from Wikipedia, academic journals, and institutional sources
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}