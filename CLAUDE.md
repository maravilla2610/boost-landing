# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 landing page for CryptGen (previously named Bitrus), a crypto companion application. The project uses the App Router architecture with TypeScript and Tailwind CSS v4.

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4 (using @import syntax in CSS)
- **UI Components**: Custom components based on shadcn/ui (New York style)
- **Animations**: Motion (Framer Motion), tw-animate-css
- **Icons**: Lucide React, Tabler Icons, React Icons

## Architecture

### Directory Structure

- `app/` - Next.js App Router files
  - `layout.tsx` - Root layout with NavigationBar and dark mode enabled by default
  - `page.tsx` - Homepage assembling landing sections
  - `globals.css` - Tailwind v4 CSS with custom theme variables

- `components/` - React components
  - `landing/` - Landing page sections (hero, features, about, products)
  - `ui/` - Reusable UI components (based on shadcn/ui patterns)
  - `navigation-bar.tsx` - Top-level navigation component

- `lib/` - Utility functions
  - `utils.ts` - Contains `cn()` helper for className merging

### Key Configuration

**Path Aliases** (tsconfig.json):
- `@/*` maps to project root
- Components use paths like `@/components/ui/button`

**Shadcn/ui Configuration** (components.json):
- Style: "new-york"
- RSC: enabled
- Icon library: Lucide
- Registry includes Aceternity UI components

**Tailwind CSS v4**:
- Uses CSS imports (`@import "tailwindcss"`) in app/globals.css
- PostCSS config uses `@tailwindcss/postcss` plugin
- Theme variables defined inline using `@theme inline` directive
- Custom variant for dark mode: `@custom-variant dark (&:is(.dark *))`

### Component Patterns

**Landing Page Sections**:
The homepage (`app/page.tsx`) composes sections from `components/landing/`:
- Hero - Main hero section with animated text
- BentoGridLanding (features) - Feature showcase
- About - About section
- Products - Product showcase

**Client Components**:
All interactive components use `"use client"` directive (e.g., navigation-bar.tsx, hero.tsx)

**UI Components**:
Located in `components/ui/`, includes custom animated components:
- `hover-border-gradient` - Animated button with gradient border
- `encrypted-text` - Animated text encryption effect
- `bento-grid` - Grid layout component
- `sticky-scroll-reveal` - Scroll-based animations
- `timeline` - Timeline component
- `resizable-navbar` - Responsive navigation with mobile support
- `glowing-effect` - Glowing effect wrapper
- `card` - Base card component

### Styling Conventions

- Dark mode is enabled by default in root layout (`className="dark"`)
- Use `cn()` utility from `@/lib/utils` for conditional className merging
- Color system uses CSS custom properties with OKLCH color space
- Radius variables: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`

## Fonts

The project uses Next.js font optimization with Geist fonts:
- `--font-geist-sans` - Geist Sans (variable font)
- `--font-geist-mono` - Geist Mono (variable font)

Both fonts are loaded in `app/layout.tsx` and applied via CSS variables.

## Important Notes

- This is a landing page project with no backend/API routes currently
- The app is set to dark mode by default in the root layout
- All landing page content is currently client-side rendered
- Navigation uses hash links for single-page navigation (#features, #about, #products)