# Technology Stack

## Core Framework
- **Next.js 15.4.6** - React framework with App Router
- **React 19.1.0** - Latest React with concurrent features
- **TypeScript 5** - Static type checking

## Styling & UI
- **Tailwind CSS v4** - Utility-first CSS framework
- **PostCSS** - CSS processing with Tailwind plugin
- **Geist Fonts** - Optimized font family (Sans & Mono)

## Build System
- **Turbopack** - Fast bundler for development
- **Bun** - Package manager (based on bun.lock presence)

## Common Commands

### Development
```bash
# Start development server with Turbopack
npm run dev
# or
bun dev
```

### Production
```bash
# Build for production
npm run build
# or
bun run build

# Start production server
npm start
# or
bun start
```

### Code Quality
```bash
# Run ESLint
npm run lint
# or
bun run lint
```

## Configuration Notes
- Uses ES2017 target in TypeScript
- Strict TypeScript configuration enabled
- Path aliases configured with `@/*` pointing to root
- CSS custom properties for theming
- Dark mode support via `prefers-color-scheme`