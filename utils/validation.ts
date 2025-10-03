/**
 * Validation utilities for the Trusted Search Engine
 */

import { SearchFilters, SourceType, ContentType } from '@/types';
import { SEARCH_CONSTANTS, SOURCE_TYPES, CONTENT_TYPES } from './constants';

export function validateSearchQuery(query: string): { isValid: boolean; error?: string } {
  if (!query || typeof query !== 'string') {
    return { isValid: false, error: 'Query is required and must be a string' };
  }
  
  if (query.length < SEARCH_CONSTANTS.MIN_QUERY_LENGTH) {
    return { isValid: false, error: 'Query is too short' };
  }
  
  if (query.length > SEARCH_CONSTANTS.MAX_QUERY_LENGTH) {
    return { isValid: false, error: 'Query is too long' };
  }
  
  return { isValid: true };
}

export function validateSearchFilters(filters: SearchFilters): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate source types
  if (filters.sourceTypes) {
    const validSourceTypes = Object.values(SOURCE_TYPES);
    const invalidTypes = filters.sourceTypes.filter(type => !validSourceTypes.includes(type as any));
    if (invalidTypes.length > 0) {
      errors.push(`Invalid source types: ${invalidTypes.join(', ')}`);
    }
  }
  
  // Validate content types
  if (filters.contentTypes) {
    const validContentTypes = Object.values(CONTENT_TYPES);
    const invalidTypes = filters.contentTypes.filter(type => !validContentTypes.includes(type as any));
    if (invalidTypes.length > 0) {
      errors.push(`Invalid content types: ${invalidTypes.join(', ')}`);
    }
  }
  
  // Validate date range
  if (filters.dateRange) {
    const { start, end } = filters.dateRange;
    if (start && end && start > end) {
      errors.push('Start date must be before end date');
    }
  }
  
  // Validate authority score
  if (filters.minAuthorityScore !== undefined) {
    if (filters.minAuthorityScore < 0 || filters.minAuthorityScore > SEARCH_CONSTANTS.MAX_AUTHORITY_SCORE) {
      errors.push('Authority score must be between 0 and 1');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeQuery(query: string): string {
  // Remove potentially harmful characters and normalize whitespace
  return query
    .replace(/[<>\"'&]/g, '') // Remove HTML/script injection characters
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}