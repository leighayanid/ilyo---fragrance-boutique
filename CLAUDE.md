# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ilyo Fragrance Boutique is a luxury e-commerce platform for selling fragrances. The project uses a modern monorepo architecture with:

- **Frontend**: Nuxt 4 with SSR
- **UI Framework**: shadcn-vue + Tailwind CSS
- **Backend**: Medusa.js e-commerce platform
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Database**: PostgreSQL + Redis

## Prerequisites

- Node.js 20+
- pnpm 8+
- PostgreSQL 14+
- Redis 6+

## Development Commands

```bash
# Install dependencies
pnpm install

# Development - run all apps
pnpm dev

# Development - run specific apps
pnpm dev:storefront          # Nuxt storefront on port 3000
pnpm dev:backend             # Medusa API on port 9000

# Build all packages
pnpm build

# Type checking
pnpm type-check

# Linting
pnpm lint

# Clean all builds and dependencies
pnpm clean
```

## Monorepo Structure

```
├── apps/
│   └── storefront/          # Nuxt 4 customer-facing app
├── packages/
│   ├── medusa-backend/      # Medusa.js backend
│   ├── types/               # Shared TypeScript types
│   ├── utils/               # Shared utilities
│   └── ui/                  # Shared UI components
├── turbo.json               # Turborepo configuration
└── pnpm-workspace.yaml      # pnpm workspace config
```

## Architecture

### Nuxt 4 Storefront ([apps/storefront](apps/storefront))

**Key Directories:**
- `app/pages/` - File-based routing
- `app/components/` - Vue components
- `app/composables/` - Reusable composition functions (useMedusa, etc.)
- `assets/css/` - Global styles and Tailwind CSS

**Important Composables:**
- `useMedusa()` - Medusa JS SDK client initialization

**Configuration:**
- [nuxt.config.ts](apps/storefront/nuxt.config.ts) - Nuxt configuration
- [.env.example](apps/storefront/.env.example) - Environment variables template

### Medusa Backend ([packages/medusa-backend](packages/medusa-backend))

**Key Directories:**
- `src/api/` - Custom API endpoints
- `src/models/` - Custom data models for fragrance metadata
- `src/services/` - Custom business logic
- `src/subscribers/` - Event subscribers

**Configuration:**
- [medusa-config.ts](packages/medusa-backend/medusa-config.ts) - Medusa configuration
- [.env.example](packages/medusa-backend/.env.example) - Environment variables template

**Fragrance-Specific Extensions:**
The backend will be extended with custom fields for fragrance products:
- `fragrance_family` - Floral, Woody, Oriental, Fresh, Citrus, Aromatic
- `concentration` - Parfum, EDP, EDT, EDC, Cologne
- `gender` - Men, Women, Unisex
- `top_notes`, `middle_notes`, `base_notes` - Scent composition arrays
- `longevity`, `sillage` - Performance metrics (1-10 scale)
- `seasons`, `occasions` - Usage recommendations arrays

### Shared Packages

**[@ilyo/types](packages/types)** - TypeScript definitions:
- `FragranceMetadata` - Fragrance product metadata types
- `FragranceFamily`, `FragranceConcentration`, etc. - Enum types
- Product-related interfaces

**[@ilyo/utils](packages/utils)** - Shared utilities:
- `formatPrice()` - Currency formatting
- `getFragranceFamilyColor()` - UI color mapping for fragrance families
- `formatNotes()` - Format fragrance notes for display
- `getLongevityLabel()`, `getSillageLabel()` - Convert numeric values to labels

**[@ilyo/ui](packages/ui)** - Shared UI components (placeholder for future components)

## Setup Instructions

### Initial Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Set up environment variables:**
   ```bash
   # Storefront
   cp apps/storefront/.env.example apps/storefront/.env

   # Medusa Backend
   cp packages/medusa-backend/.env.example packages/medusa-backend/.env
   ```

3. **Create PostgreSQL database:**
   ```bash
   createdb medusa-db
   ```

4. **Run Medusa migrations:**
   ```bash
   cd packages/medusa-backend
   pnpm migrations
   ```

### Running Development Servers

```bash
# From root directory - runs all apps
pnpm dev

# Access applications:
# - Storefront: http://localhost:3000
# - Medusa Admin: http://localhost:9000/app
# - Medusa API: http://localhost:9000
```

## Adding Dependencies

```bash
# Add to storefront
pnpm add <package> --filter=storefront

# Add to Medusa backend
pnpm add <package> --filter=@ilyo/medusa-backend

# Add to shared packages
pnpm add <package> --filter=@ilyo/types
pnpm add <package> --filter=@ilyo/utils
```

## Environment Variables

### Storefront ([apps/storefront/.env](apps/storefront/.env.example))
```env
NUXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NUXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Medusa Backend ([packages/medusa-backend/.env](packages/medusa-backend/.env.example))
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medusa-db
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret-change-in-production
COOKIE_SECRET=supersecret-change-in-production
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:7001,http://localhost:9000
```

## Code Conventions

- Use TypeScript for all new code
- Follow Vue 3 Composition API style in Nuxt components
- Use shadcn-vue components for UI consistency
- Import shared types from `@ilyo/types`
- Import utilities from `@ilyo/utils`
- Keep components focused and composable
- Use workspace protocol for internal package dependencies (`workspace:*`)

## Project Documentation

- [README.md](README.md) - Project overview and quick start
- [PROJECT_PLAN.md](PROJECT_PLAN.md) - Comprehensive feature and architecture plan
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Step-by-step implementation guide
- [QUICK_START.md](QUICK_START.md) - Quick start guide
- [packages/medusa-backend/README.md](packages/medusa-backend/README.md) - Medusa backend documentation

## Troubleshooting

### PostgreSQL not running
```bash
# macOS with Homebrew
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Redis not running
```bash
# macOS with Homebrew
brew services start redis

# Linux
sudo systemctl start redis
```

### Port already in use
```bash
# Kill process on port 3000 or 9000
lsof -ti:3000 | xargs kill -9
lsof -ti:9000 | xargs kill -9
```
