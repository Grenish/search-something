'use client';

import { useState, useEffect } from 'react';
import { SearchFilters, SourceType, ContentType, FilterOptions } from '@/types/search';

interface FilterPanelProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  filterOptions: FilterOptions;
  isVisible: boolean;
  onToggle: () => void;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  filterOptions,
  isVisible,
  onToggle
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<SearchFilters>(filters);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  // Handle source type filter changes
  const handleSourceTypeChange = (sourceType: SourceType, checked: boolean) => {
    const updatedSourceTypes = checked
      ? [...(localFilters.sourceTypes || []), sourceType]
      : (localFilters.sourceTypes || []).filter(type => type !== sourceType);
    
    const updatedFilters = {
      ...localFilters,
      sourceTypes: updatedSourceTypes.length > 0 ? updatedSourceTypes : undefined
    };
    
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Handle content type filter changes
  const handleContentTypeChange = (contentType: ContentType, checked: boolean) => {
    const updatedContentTypes = checked
      ? [...(localFilters.contentTypes || []), contentType]
      : (localFilters.contentTypes || []).filter(type => type !== contentType);
    
    const updatedFilters = {
      ...localFilters,
      contentTypes: updatedContentTypes.length > 0 ? updatedContentTypes : undefined
    };
    
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Handle topic filter changes
  const handleTopicChange = (topic: string, checked: boolean) => {
    const updatedTopics = checked
      ? [...(localFilters.topics || []), topic]
      : (localFilters.topics || []).filter(t => t !== topic);
    
    const updatedFilters = {
      ...localFilters,
      topics: updatedTopics.length > 0 ? updatedTopics : undefined
    };
    
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Handle date range changes
  const handleDateRangeChange = (field: 'start' | 'end', value: string) => {
    if (!value) {
      // Remove date range if either field is cleared
      const updatedFilters = { ...localFilters };
      delete updatedFilters.dateRange;
      setLocalFilters(updatedFilters);
      onFiltersChange(updatedFilters);
      return;
    }

    const updatedFilters = {
      ...localFilters,
      dateRange: {
        ...localFilters.dateRange,
        [field]: new Date(value)
      } as { start: Date; end: Date }
    };
    
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Handle authority score filter
  const handleAuthorityScoreChange = (value: string) => {
    const score = value ? parseFloat(value) : undefined;
    const updatedFilters = {
      ...localFilters,
      minAuthorityScore: score
    };
    
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    const clearedFilters: SearchFilters = {};
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // Reset filters to initial state
  const handleResetFilters = () => {
    setLocalFilters(filters);
  };

  // Check if any filters are active
  const hasActiveFilters = Object.keys(localFilters).some(key => {
    const value = localFilters[key as keyof SearchFilters];
    return Array.isArray(value) ? value.length > 0 : value !== undefined;
  });

  // Format date for input
  const formatDateForInput = (date?: Date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className={`bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg transition-all duration-300 ${
      isVisible ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0 overflow-hidden'
    }`}>
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Search Filters
        </h3>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              Clear All
            </button>
          )}
          <button
            onClick={onToggle}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Source Types Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            Source Types
          </h4>
          <div className="space-y-2">
            {filterOptions.availableSourceTypes.map((sourceType) => (
              <label key={sourceType} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.sourceTypes?.includes(sourceType) || false}
                  onChange={(e) => handleSourceTypeChange(sourceType, e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {sourceType === 'wikipedia' ? 'Wikipedia' :
                   sourceType === 'academic' ? 'Academic' :
                   sourceType === 'government' ? 'Government' :
                   sourceType === 'encyclopedia' ? 'Encyclopedia' : sourceType}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Content Types Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            Content Types
          </h4>
          <div className="space-y-2">
            {filterOptions.availableContentTypes.map((contentType) => (
              <label key={contentType} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.contentTypes?.includes(contentType) || false}
                  onChange={(e) => handleContentTypeChange(contentType, e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                  {contentType}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Topics Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            Topics
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {filterOptions.availableTopics.map((topic) => (
              <label key={topic} className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.topics?.includes(topic) || false}
                  onChange={(e) => handleTopicChange(topic, e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {topic}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            Publication Date Range
          </h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                From
              </label>
              <input
                type="date"
                value={formatDateForInput(localFilters.dateRange?.start)}
                onChange={(e) => handleDateRangeChange('start', e.target.value)}
                min={formatDateForInput(filterOptions.dateRange.min)}
                max={formatDateForInput(filterOptions.dateRange.max)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">
                To
              </label>
              <input
                type="date"
                value={formatDateForInput(localFilters.dateRange?.end)}
                onChange={(e) => handleDateRangeChange('end', e.target.value)}
                min={formatDateForInput(filterOptions.dateRange.min)}
                max={formatDateForInput(filterOptions.dateRange.max)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Authority Score Filter */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3">
            Minimum Authority Score
          </h4>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={localFilters.minAuthorityScore || 0}
              onChange={(e) => handleAuthorityScoreChange(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>0.0</span>
              <span className="font-medium">
                {localFilters.minAuthorityScore?.toFixed(1) || '0.0'}
              </span>
              <span>10.0</span>
            </div>
          </div>
        </div>

        {/* Filter Actions */}
        <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleResetFilters}
            className="flex-1 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleClearFilters}
            className="flex-1 px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}