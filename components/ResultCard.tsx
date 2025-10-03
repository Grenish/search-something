'use client';

import { SearchResult } from '@/types/search';

interface ResultCardProps {
  result: SearchResult;
}

export function ResultCard({ result }: ResultCardProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getSourceBadgeColor = (type: string) => {
    switch (type) {
      case 'wikipedia':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'academic':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'government':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'encyclopedia':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <article className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white dark:bg-gray-800">
      {/* Title and URL */}
      <div className="mb-2">
        <a
          href={result.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-medium text-blue-600 dark:text-blue-400 hover:underline line-clamp-2"
        >
          {result.title}
        </a>
        <div className="text-sm text-green-600 dark:text-green-400 mt-1">
          {result.url}
        </div>
      </div>

      {/* Snippet */}
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3 line-clamp-3">
        {result.snippet}
      </p>

      {/* Source info and metadata */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Source badge */}
        <span className={`px-2 py-1 rounded-full font-medium ${getSourceBadgeColor(result.source.type)}`}>
          {result.source.name}
        </span>

        {/* Content type */}
        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 font-medium capitalize">
          {result.contentType}
        </span>

        {/* Authority score */}
        <span className="text-gray-500 dark:text-gray-400">
          Authority: {result.source.authorityScore.toFixed(1)}
        </span>

        {/* Published date */}
        {result.publishedDate && (
          <span className="text-gray-500 dark:text-gray-400">
            {formatDate(result.publishedDate)}
          </span>
        )}

        {/* Relevance score */}
        <span className="text-gray-500 dark:text-gray-400">
          Relevance: {(result.relevanceScore * 100).toFixed(0)}%
        </span>
      </div>

      {/* Topics */}
      {result.topics.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {result.topics.slice(0, 3).map((topic, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded"
            >
              {topic}
            </span>
          ))}
          {result.topics.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500 dark:text-gray-400">
              +{result.topics.length - 3} more
            </span>
          )}
        </div>
      )}
    </article>
  );
}