'use client';

import { SearchResult } from '@/types/search';
import { ResultCard } from './ResultCard';

interface SearchResultsProps {
  results: SearchResult[];
  totalCount: number;
  currentPage: number;
  totalPages?: number;
  isLoading?: boolean;
  error?: string | null;
  query?: string;
  searchTime?: number;
}

export function SearchResults({
  results,
  totalCount,
  currentPage,
  totalPages,
  isLoading = false,
  error = null,
  query = '',
  searchTime = 0
}: SearchResultsProps) {
  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        {/* Loading skeleton */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 animate-pulse"
          >
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
            </div>
            <div className="flex gap-2 mt-3">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 dark:text-red-400 text-lg font-medium mb-2">
          Search Error
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // No results state
  if (results.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-2">
          No results found
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {query ? (
            <>
              No trusted sources contain information matching <strong>"{query}"</strong>
            </>
          ) : (
            'Try adjusting your search terms or filters'
          )}
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          <p>Suggestions:</p>
          <ul className="mt-2 space-y-1">
            <li>• Check your spelling</li>
            <li>• Try different or more general keywords</li>
            <li>• Remove some filters to broaden your search</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {totalCount > 0 && (
            <>
              About <strong>{totalCount.toLocaleString()}</strong> results
              {query && (
                <>
                  {' '}for <strong>"{query}"</strong>
                </>
              )}
              {searchTime > 0 && (
                <span className="ml-2">
                  ({(searchTime / 1000).toFixed(2)} seconds)
                </span>
              )}
            </>
          )}
        </div>
        
        {totalPages && totalPages > 1 && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {/* Results list */}
      <div className="space-y-4">
        {results.map((result) => (
          <ResultCard key={result.id} result={result} />
        ))}
      </div>

      {/* Pagination placeholder */}
      {totalPages && totalPages > 1 && (
        <div className="flex justify-center pt-6">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Pagination controls will be implemented in a future task
          </div>
        </div>
      )}
    </div>
  );
}