# Project Structure

## Directory Organization

```
├── app/                    # Next.js App Router directory
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page component
│   ├── globals.css        # Global styles and Tailwind imports
│   └── favicon.ico        # Site favicon
├── public/                # Static assets
│   ├── *.svg             # SVG icons and logos
├── .kiro/                 # Kiro AI assistant configuration
│   └── steering/         # AI guidance documents
├── node_modules/          # Dependencies
└── [config files]        # Various configuration files
```

## Key Conventions

### File Naming
- React components use PascalCase: `layout.tsx`, `page.tsx`
- Configuration files use kebab-case or standard names
- Static assets in `public/` use lowercase with extensions

### Component Structure
- **Root Layout** (`app/layout.tsx`): Contains HTML structure, font loading, and global metadata
- **Pages** (`app/page.tsx`): Individual route components
- **Global Styles** (`app/globals.css`): Tailwind imports and CSS custom properties

### Styling Approach
- Utility-first with Tailwind CSS classes
- CSS custom properties for theming (`--background`, `--foreground`)
- Responsive design with `sm:` breakpoint prefixes
- Dark mode support via CSS media queries

### TypeScript Patterns
- Strict type checking enabled
- Use `Readonly<>` for props that shouldn't be mutated
- Import types with `import type` syntax
- Path aliases with `@/*` for cleaner imports

### Asset Management
- Static files in `public/` directory
- Use Next.js `Image` component for optimized images
- SVG icons stored in `public/` and referenced by path