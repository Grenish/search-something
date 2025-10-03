import { Suspense } from 'react';
import { SearchInterface } from '@/components/SearchInterface';
import { SearchErrorBoundary } from '@/components/SearchErrorBoundary';
import { SearchFilters } from '@/types/search';
import { urlParamsToFilters } from '@/utils/filterUtils';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function SearchContent({ searchParams }: HomeProps) {
  // Await search parameters in Next.js 15
  const params = await searchParams;
  
  // Extract search parameters
  const query = typeof params.q === 'string' ? params.q : '';
  
  // Convert URL parameters to filters
  const urlSearchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string') {
      urlSearchParams.set(key, value);
    }
  });
  
  const filters = urlParamsToFilters(urlSearchParams);

  return (
    <SearchErrorBoundary>
      <SearchInterface 
        initialQuery={query}
        initialFilters={filters}
      />
    </SearchErrorBoundary>
  );
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trusted Search
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Search reliable sources only
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        }>
          <SearchContent searchParams={searchParams} />
        </Suspense>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>Powered by trusted sources including Wikipedia, academic journals, and institutional websites</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
