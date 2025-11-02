# Ilyo Fragrance Boutique

A luxury e-commerce platform for selling fragrances, built with modern web technologies.

## Tech Stack

- **Frontend**: Nuxt 4 with SSR
- **UI Framework**: shadcn-vue + Tailwind CSS
- **Backend**: Medusa.js e-commerce platform
- **Monorepo**: Turborepo
- **Package Manager**: pnpm
- **Database**: PostgreSQL + Redis

## Project Structure

```
├── apps/
│   └── storefront/          # Nuxt 4 customer-facing app
├── packages/
│   ├── medusa-backend/      # Medusa.js backend
│   ├── types/               # Shared TypeScript types
│   ├── utils/               # Shared utilities
│   └── ui/                  # Shared UI components
```

## Prerequisites

- Node.js 20+
- pnpm 9+
- Docker Desktop (recommended) OR PostgreSQL 14+ & Redis 6+

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Database (Docker - Recommended)

```bash
# Start PostgreSQL and Redis with Docker
docker-compose up -d

# Verify services are running
docker-compose ps
```

**Alternative**: If you prefer local PostgreSQL/Redis installation, see traditional setup below.

### 3. Set Up Environment Variables

```bash
# Storefront
cp apps/storefront/.env.example apps/storefront/.env

# Medusa Backend
cp packages/medusa-backend/.env.example packages/medusa-backend/.env
```

The default `.env.example` files are already configured for Docker setup.

### 4. Run Database Migrations

```bash
cd packages/medusa-backend
pnpm migrations
```

### 5. Start Development

```bash
# From root directory - runs all apps
pnpm dev

# Or run individually:
pnpm dev:storefront  # Runs storefront only
pnpm dev:backend     # Runs Medusa backend only
```

### 6. Access Applications

- **Storefront**: http://localhost:3000
- **Medusa Admin**: http://localhost:9000/app
- **Medusa API**: http://localhost:9000

## Development Commands

```bash
# Development
pnpm dev                    # Run all apps
pnpm dev:storefront         # Run storefront only
pnpm dev:backend            # Run Medusa backend only

# Building
pnpm build                  # Build all packages

# Type Checking
pnpm type-check             # Type check all packages

# Linting
pnpm lint                   # Lint all packages

# Clean
pnpm clean                  # Clean all build artifacts
```

## Docker Commands

```bash
# Start databases
docker-compose up -d

# Stop databases
docker-compose down

# View logs
docker-compose logs -f

# Reset databases (removes all data)
docker-compose down -v
```

For detailed Docker setup instructions, see [DOCKER_SETUP.md](DOCKER_SETUP.md).

## Traditional Database Setup (Without Docker)

If you prefer installing PostgreSQL and Redis locally:

```bash
# Install on macOS
brew install postgresql@14 redis

# Start services
brew services start postgresql@14
brew services start redis

# Create database
createdb medusa-db
```

## Documentation

- [DOCKER_SETUP.md](DOCKER_SETUP.md) - Docker database setup guide
- [PROJECT_PLAN.md](PROJECT_PLAN.md) - Comprehensive feature and architecture plan
- [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) - Step-by-step setup instructions
- [QUICK_START.md](QUICK_START.md) - Quick start guide
- [CLAUDE.md](CLAUDE.md) - Guidelines for Claude Code

## Features

### Planned Features

- 🛍️ Product catalog with fragrance-specific metadata
- 🔍 Advanced filtering by notes, family, concentration
- 🛒 Shopping cart and checkout
- 👤 User authentication and profiles
- 💳 Payment processing (Stripe)
- 📦 Order management
- ⭐ Product reviews and ratings
- 🎯 Fragrance finder quiz
- 📱 Responsive design
- 🎨 Luxury UI with shadcn-vue components

## Contributing

This is a private project. For development guidelines, see [CLAUDE.md](CLAUDE.md).

## License

Private - All rights reserved
