# Trusted Search Engine - Project Structure

This document outlines the project structure and organization for the Trusted Search Engine.

## Directory Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   └── api/               # API routes (to be created)
├── components/            # React components
│   ├── search/           # Search-related components
│   ├── ui/               # Reusable UI components
│   └── layout/           # Layout components
├── services/             # Business logic services
│   ├── search.ts         # Search service
│   ├── indexing.ts       # Indexing service
│   └── sources.ts        # Source management service
├── lib/                  # External integrations and configs
│   ├── config.ts         # Environment configuration
│   ├── database.ts       # Database connection
│   ├── elasticsearch.ts  # Elasticsearch client
│   ├── redis.ts          # Redis client
│   └── ai/               # AI/ML integrations
├── types/                # TypeScript type definitions
│   ├── search.ts         # Search-related types
│   ├── api.ts            # API types
│   └── index.ts          # Type exports
├── utils/                # Utility functions
│   ├── constants.ts      # Application constants
│   ├── validation.ts     # Validation utilities
│   ├── logger.ts         # Logging utility
│   └── helpers.ts        # General helpers
├── public/               # Static assets
└── .env.example          # Environment variables template
```

## Key Conventions

### File Naming
- React components: PascalCase (e.g., `SearchInterface.tsx`)
- Services and utilities: camelCase (e.g., `searchService.ts`)
- Types: camelCase with descriptive names (e.g., `searchTypes.ts`)
- Constants: UPPER_SNAKE_CASE for values, camelCase for files

### Import Aliases
- `@/` - Root directory alias
- `@/components` - React components
- `@/services` - Business logic services
- `@/types` - TypeScript types
- `@/utils` - Utility functions
- `@/lib` - External integrations

### Type Organization
- Core domain types in `types/search.ts`
- API-specific types in `types/api.ts`
- Component prop types co-located with components
- Service interfaces in respective service files

### Environment Configuration
- All environment variables defined in `.env.example`
- Configuration centralized in `lib/config.ts`
- Validation function for required variables
- Type-safe access to environment variables

## Development Guidelines

### Adding New Features
1. Define types in `types/` directory
2. Create services in `services/` directory
3. Build components in `components/` directory
4. Add API routes in `app/api/` directory
5. Update configuration if needed

### Code Organization
- Keep components focused and single-purpose
- Extract business logic into services
- Use TypeScript interfaces for all data structures
- Implement proper error handling and logging
- Follow the established naming conventions

### Testing Structure (to be implemented)
- Unit tests: `__tests__/` directories alongside source files
- Integration tests: `tests/integration/`
- E2E tests: `tests/e2e/`
- Test utilities: `tests/utils/`