# Quick Start Guide

Get your fragrance e-commerce platform up and running in minutes.

## Prerequisites Checklist

- [ ] Node.js 20+ installed
- [ ] pnpm installed (`npm install -g pnpm`)
- [ ] PostgreSQL installed and running
- [ ] Redis installed and running

## Setup in 5 Minutes

### 1. Initialize Monorepo (2 min)

```bash
# Create root package.json
cat > package.json << 'EOF'
{
  "name": "ilyo-fragrance-boutique",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  },
  "devDependencies": {
    "turbo": "^2.0.0"
  },
  "packageManager": "pnpm@8.15.0"
}
EOF

# Create workspace config
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - 'apps/*'
  - 'packages/*'
EOF

# Create turbo config
cat > turbo.json << 'EOF'
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".nuxt/**", ".output/**", "dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {}
  }
}
EOF

pnpm install
```

### 2. Create Nuxt Storefront (1 min)

```bash
mkdir -p apps/storefront
cd apps/storefront
pnpm dlx nuxi@latest init . --packageManager pnpm --no-install

# Add Medusa SDK and shadcn-vue
pnpm add @medusajs/js-sdk
pnpm add -D @nuxtjs/tailwindcss shadcn-nuxt

# Initialize shadcn-vue
pnpm dlx shadcn-vue@latest init
```

**Update apps/storefront/nuxt.config.ts:**
```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt'],
  runtimeConfig: {
    public: {
      medusaUrl: 'http://localhost:9000',
    }
  },
  compatibilityDate: '2024-11-01',
})
```

### 3. Set Up Medusa Backend (2 min)

```bash
cd ../..
mkdir -p packages/medusa-backend
cd packages/medusa-backend

# Create Medusa project
npx create-medusa-app@latest . --skip-db --skip-migrations

# Or manually install
pnpm add @medusajs/medusa @medusajs/medusa-cli @medusajs/admin

# Create environment file
cat > .env << 'EOF'
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medusa-db
REDIS_URL=redis://localhost:6379
JWT_SECRET=supersecret123
COOKIE_SECRET=supersecret123
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:7001
EOF

# Create database
createdb medusa-db

# Run migrations
pnpm medusa migrations run

# Seed with demo data
pnpm medusa seed -f ./data/seed.json
```

## Run Everything

```bash
# From root directory
pnpm run dev

# Or run separately in different terminals:

# Terminal 1 - Storefront
cd apps/storefront
pnpm run dev

# Terminal 2 - Medusa
cd packages/medusa-backend
pnpm medusa develop
```

## Access Your Apps

- **Storefront**: http://localhost:3000
- **Medusa Admin**: http://localhost:9000/app
- **Medusa API**: http://localhost:9000

## First Steps After Setup

1. **Login to Medusa Admin**: http://localhost:9000/app
   - Create your admin account on first visit

2. **Create Your First Product**:
   - Go to Products → Add Product
   - Add fragrance details in metadata
   - Upload product images

3. **Test the Storefront**:
   - Visit http://localhost:3000
   - Browse products
   - Add to cart

## Add Essential shadcn-vue Components

```bash
cd apps/storefront

pnpm dlx shadcn-vue@latest add button
pnpm dlx shadcn-vue@latest add card
pnpm dlx shadcn-vue@latest add input
pnpm dlx shadcn-vue@latest add dialog
pnpm dlx shadcn-vue@latest add sheet
pnpm dlx shadcn-vue@latest add badge
```

## Create Basic Medusa Integration

**apps/storefront/composables/useMedusa.ts:**
```typescript
import Medusa from "@medusajs/js-sdk"

let client: Medusa | null = null

export const useMedusa = () => {
  if (!client) {
    const config = useRuntimeConfig()
    client = new Medusa({
      baseUrl: config.public.medusaUrl,
    })
  }
  return client
}
```

## Create Your First Product Page

**apps/storefront/app/pages/products/[handle].vue:**
```vue
<template>
  <div v-if="product" class="container mx-auto p-4">
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <img :src="product.thumbnail" :alt="product.title" class="w-full rounded-lg" />
      </div>
      <div>
        <h1 class="text-3xl font-bold">{{ product.title }}</h1>
        <p class="text-2xl mt-4">${{ (product.variants[0].prices[0].amount / 100).toFixed(2) }}</p>
        <p class="mt-4">{{ product.description }}</p>
        <Button class="mt-6" @click="addToCart">Add to Cart</Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const medusa = useMedusa()
const product = ref(null)

const { data } = await useAsyncData('product', async () => {
  const response = await medusa.store.product.list({
    handle: route.params.handle
  })
  return response.products[0]
})

product.value = data.value

const addToCart = () => {
  // Implement cart logic
  console.log('Added to cart!')
}
</script>
```

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

### Medusa migrations fail
```bash
# Drop and recreate database
dropdb medusa-db
createdb medusa-db
cd packages/medusa-backend
pnpm medusa migrations run
```

## Next Steps

1. **Read the full docs**:
   - PROJECT_PLAN.md - Complete feature roadmap
   - IMPLEMENTATION_GUIDE.md - Detailed setup
   - CLAUDE.md - Development guidelines

2. **Create shared packages**:
   - packages/types - TypeScript definitions
   - packages/utils - Shared utilities
   - packages/ui - Shared components

3. **Build core features**:
   - Product listing pages
   - Shopping cart
   - Checkout flow
   - User authentication

4. **Customize for fragrances**:
   - Add fragrance metadata to products
   - Create scent notes visualization
   - Build filtering system
   - Add fragrance finder quiz

## Quick Commands Reference

```bash
# Development
pnpm run dev                              # Run all
pnpm run dev --filter=storefront          # Storefront only
pnpm run dev --filter=medusa-backend      # Backend only

# Building
pnpm run build                            # Build all
pnpm run build --filter=storefront        # Build storefront

# Dependencies
pnpm add <package> --filter=storefront    # Add to specific app
pnpm install                              # Install all

# Database
pnpm --filter=medusa-backend medusa migrations run
pnpm --filter=medusa-backend medusa seed
```

## Getting Help

- Check PROJECT_PLAN.md for architecture details
- Check IMPLEMENTATION_GUIDE.md for detailed instructions
- Check CLAUDE.md for development conventions
- Medusa docs: https://docs.medusajs.com
- Nuxt docs: https://nuxt.com
- shadcn-vue docs: https://www.shadcn-vue.com
