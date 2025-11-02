# Implementation Guide - Ilyo Fragrance Boutique

This guide provides step-by-step instructions for implementing the fragrance e-commerce platform.

## Prerequisites

- Node.js 20+ (for Nuxt 4)
- pnpm 8+ (recommended for monorepo)
- PostgreSQL 14+
- Redis 6+
- Git

## Step 1: Initialize Turborepo Monorepo

```bash
# Create the monorepo using pnpm
pnpm dlx create-turbo@latest

# Or manually:
mkdir ilyo-fragrance-boutique
cd ilyo-fragrance-boutique
pnpm init
pnpm add -D turbo
```

### Create workspace configuration

**pnpm-workspace.yaml**
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

**package.json** (root)
```json
{
  "name": "ilyo-fragrance-boutique",
  "private": true,
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean && rm -rf node_modules"
  },
  "devDependencies": {
    "turbo": "^2.0.0",
    "typescript": "^5.5.0"
  },
  "packageManager": "pnpm@8.15.0",
  "engines": {
    "node": ">=20"
  }
}
```

**turbo.json**
```json
{
  "$schema": "https://turbo.build/schema.json",
  "globalDependencies": ["**/.env.*local"],
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", ".nuxt/**", ".output/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    },
    "clean": {
      "cache": false
    }
  }
}
```

## Step 2: Set Up Shared Packages

### Types Package

```bash
mkdir -p packages/types
cd packages/types
pnpm init
```

**packages/types/package.json**
```json
{
  "name": "@ilyo/types",
  "version": "0.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.5.0"
  }
}
```

**packages/types/tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "moduleResolution": "bundler"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

**packages/types/src/index.ts**
```typescript
// Fragrance-specific types
export type FragranceFamily = 'Floral' | 'Woody' | 'Oriental' | 'Fresh' | 'Citrus' | 'Aromatic';

export type Concentration = 'Parfum' | 'EDP' | 'EDT' | 'EDC' | 'Cologne';

export type Gender = 'Men' | 'Women' | 'Unisex';

export type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter' | 'All';

export type Occasion = 'Day' | 'Night' | 'Office' | 'Casual' | 'Formal' | 'Date' | 'Sport';

export interface FragranceNote {
  name: string;
  category: 'Top' | 'Middle' | 'Base';
}

export interface FragranceMetadata {
  fragrance_family: FragranceFamily;
  concentration: Concentration;
  gender: Gender;
  top_notes: string[];
  middle_notes: string[];
  base_notes: string[];
  longevity: number; // 1-10
  sillage: number; // 1-10
  seasons: Season[];
  occasions: Occasion[];
  year_launched?: number;
  perfumer?: string;
}

export interface ProductWithFragrance {
  id: string;
  title: string;
  handle: string;
  description: string;
  thumbnail: string;
  metadata: FragranceMetadata;
  variants: ProductVariant[];
  collection_id?: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string;
  prices: Price[];
  inventory_quantity: number;
  size?: string; // e.g., "50ml", "100ml"
}

export interface Price {
  amount: number;
  currency_code: string;
}
```

### Utils Package

```bash
mkdir -p packages/utils
cd packages/utils
pnpm init
```

**packages/utils/src/index.ts**
```typescript
// Price formatting
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount / 100); // Medusa stores prices in cents
}

// Fragrance helpers
export function getFragranceFamilyColor(family: string): string {
  const colors: Record<string, string> = {
    Floral: '#E91E63',
    Woody: '#795548',
    Oriental: '#FF9800',
    Fresh: '#2196F3',
    Citrus: '#FFC107',
    Aromatic: '#4CAF50',
  };
  return colors[family] || '#9E9E9E';
}

// SEO helpers
export function generateProductSchema(product: any) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.thumbnail,
    offers: {
      '@type': 'Offer',
      price: product.variants[0]?.prices[0]?.amount / 100,
      priceCurrency: product.variants[0]?.prices[0]?.currency_code || 'USD',
      availability: 'https://schema.org/InStock',
    },
  };
}
```

## Step 3: Set Up Medusa Backend

```bash
mkdir -p packages/medusa-backend
cd packages/medusa-backend

# Initialize Medusa project
npx create-medusa-app@latest
# Or manually:
pnpm add @medusajs/medusa @medusajs/medusa-cli
pnpm add @medusajs/admin @medusajs/admin-ui
```

**packages/medusa-backend/medusa-config.js**
```javascript
module.exports = {
  projectConfig: {
    database_url: process.env.DATABASE_URL,
    redis_url: process.env.REDIS_URL,
    admin_cors: process.env.ADMIN_CORS || "http://localhost:7001",
    store_cors: process.env.STORE_CORS || "http://localhost:3000",
    jwt_secret: process.env.JWT_SECRET || "supersecret",
    cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  },
  modules: {
    // Add custom modules as needed
  },
  plugins: [
    {
      resolve: `@medusajs/admin`,
      options: {
        autoRebuild: true,
        develop: {
          open: process.env.OPEN_BROWSER !== "false",
        },
      },
    },
  ],
};
```

**packages/medusa-backend/.env** (create this file)
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/medusa-db
REDIS_URL=redis://localhost:6379
JWT_SECRET=something-secret
COOKIE_SECRET=something-secret
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:7001
```

**packages/medusa-backend/package.json**
```json
{
  "name": "@ilyo/medusa-backend",
  "version": "0.0.0",
  "scripts": {
    "dev": "medusa develop",
    "build": "medusa build",
    "seed": "medusa seed -f ./data/seed.json",
    "start": "medusa start",
    "migrations": "medusa migrations run"
  },
  "dependencies": {
    "@medusajs/medusa": "^2.0.0",
    "@medusajs/admin": "^2.0.0"
  }
}
```

### Create Custom Product Model

**packages/medusa-backend/src/models/product-fragrance.ts**
```typescript
import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { Product as MedusaProduct } from "@medusajs/medusa";
import { BaseEntity } from "@medusajs/medusa";

@Entity()
export class ProductFragrance extends BaseEntity {
  @OneToOne(() => MedusaProduct)
  @JoinColumn({ name: "product_id" })
  product: MedusaProduct;

  @Column()
  product_id: string;

  @Column({ nullable: true })
  fragrance_family: string;

  @Column({ nullable: true })
  concentration: string;

  @Column({ nullable: true })
  gender: string;

  @Column("simple-array", { nullable: true })
  top_notes: string[];

  @Column("simple-array", { nullable: true })
  middle_notes: string[];

  @Column("simple-array", { nullable: true })
  base_notes: string[];

  @Column({ type: "int", nullable: true })
  longevity: number;

  @Column({ type: "int", nullable: true })
  sillage: number;

  @Column("simple-array", { nullable: true })
  seasons: string[];

  @Column("simple-array", { nullable: true })
  occasions: string[];

  @Column({ nullable: true })
  perfumer: string;

  @Column({ type: "int", nullable: true })
  year_launched: number;
}
```

## Step 4: Set Up Nuxt 4 Storefront

```bash
mkdir -p apps/storefront
cd apps/storefront

# Initialize Nuxt 4
pnpm dlx nuxi@latest init . --packageManager pnpm
```

**apps/storefront/package.json**
```json
{
  "name": "storefront",
  "type": "module",
  "private": true,
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview",
    "lint": "eslint .",
    "type-check": "nuxt typecheck"
  },
  "dependencies": {
    "@ilyo/types": "workspace:*",
    "@ilyo/utils": "workspace:*",
    "@medusajs/js-sdk": "^2.0.0",
    "nuxt": "^4.0.0",
    "vue": "latest"
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.12.0",
    "shadcn-nuxt": "^0.10.0"
  }
}
```

**apps/storefront/nuxt.config.ts**
```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt'
  ],

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  runtimeConfig: {
    public: {
      medusaUrl: process.env.NUXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    }
  },

  devtools: { enabled: true },

  compatibilityDate: '2024-11-01',
})
```

**apps/storefront/.env**
```env
NUXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Step 5: Install shadcn-vue Components

```bash
cd apps/storefront

# Initialize shadcn-vue
pnpm dlx shadcn-vue@latest init

# Add commonly used components
pnpm dlx shadcn-vue@latest add button
pnpm dlx shadcn-vue@latest add card
pnpm dlx shadcn-vue@latest add input
pnpm dlx shadcn-vue@latest add select
pnpm dlx shadcn-vue@latest add dialog
pnpm dlx shadcn-vue@latest add sheet
pnpm dlx shadcn-vue@latest add dropdown-menu
pnpm dlx shadcn-vue@latest add badge
pnpm dlx shadcn-vue@latest add separator
pnpm dlx shadcn-vue@latest add accordion
pnpm dlx shadcn-vue@latest add tabs
pnpm dlx shadcn-vue@latest add carousel
pnpm dlx shadcn-vue@latest add toast
pnpm dlx shadcn-vue@latest add skeleton
```

## Step 6: Create Medusa Composable

**apps/storefront/composables/useMedusa.ts**
```typescript
import Medusa from "@medusajs/js-sdk"

let medusaClient: Medusa | null = null

export const useMedusa = () => {
  const config = useRuntimeConfig()

  if (!medusaClient) {
    medusaClient = new Medusa({
      baseUrl: config.public.medusaUrl,
      debug: process.dev,
      publishableKey: config.public.medusaPublishableKey,
    })
  }

  return medusaClient
}
```

**apps/storefront/composables/useCart.ts**
```typescript
export const useCart = () => {
  const medusa = useMedusa()
  const cartId = useCookie('cart_id')
  const cart = useState('cart', () => null)

  const createCart = async () => {
    const response = await medusa.store.cart.create({
      region_id: 'default-region',
    })
    cartId.value = response.cart.id
    cart.value = response.cart
    return response.cart
  }

  const getCart = async () => {
    if (!cartId.value) {
      return await createCart()
    }

    const response = await medusa.store.cart.retrieve(cartId.value)
    cart.value = response.cart
    return response.cart
  }

  const addItem = async (variantId: string, quantity: number = 1) => {
    if (!cartId.value) {
      await createCart()
    }

    const response = await medusa.store.cart.lineItem.create(cartId.value, {
      variant_id: variantId,
      quantity,
    })

    cart.value = response.cart
    return response.cart
  }

  const updateItem = async (lineId: string, quantity: number) => {
    const response = await medusa.store.cart.lineItem.update(cartId.value, lineId, {
      quantity,
    })
    cart.value = response.cart
    return response.cart
  }

  const removeItem = async (lineId: string) => {
    const response = await medusa.store.cart.lineItem.delete(cartId.value, lineId)
    cart.value = response.cart
    return response.cart
  }

  return {
    cart,
    getCart,
    createCart,
    addItem,
    updateItem,
    removeItem,
  }
}
```

## Step 7: Create Core Components

**apps/storefront/components/product/ProductCard.vue**
```vue
<template>
  <Card class="group overflow-hidden">
    <NuxtLink :to="`/products/${product.handle}`">
      <div class="aspect-square overflow-hidden">
        <img
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
    </NuxtLink>

    <CardHeader>
      <div class="flex items-start justify-between gap-2">
        <div class="flex-1">
          <CardTitle class="line-clamp-1">{{ product.title }}</CardTitle>
          <CardDescription v-if="product.metadata?.concentration">
            {{ product.metadata.concentration }}
          </CardDescription>
        </div>
        <Button
          variant="ghost"
          size="icon"
          @click="toggleWishlist"
        >
          <Heart :class="{ 'fill-current': isWishlisted }" />
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <div class="flex items-center justify-between">
        <div class="text-lg font-semibold">
          {{ formatPrice(product.variants[0]?.prices[0]?.amount) }}
        </div>
        <Button @click="handleAddToCart" size="sm">
          Add to Cart
        </Button>
      </div>

      <div v-if="product.metadata?.fragrance_family" class="mt-2">
        <Badge :style="{ backgroundColor: getFragranceFamilyColor(product.metadata.fragrance_family) }">
          {{ product.metadata.fragrance_family }}
        </Badge>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { formatPrice, getFragranceFamilyColor } from '@ilyo/utils'
import type { ProductWithFragrance } from '@ilyo/types'

const props = defineProps<{
  product: ProductWithFragrance
}>()

const { addItem } = useCart()
const isWishlisted = ref(false)

const handleAddToCart = async () => {
  await addItem(props.product.variants[0].id)
  // Show toast notification
}

const toggleWishlist = () => {
  isWishlisted.value = !isWishlisted.value
  // Save to wishlist
}
</script>
```

## Step 8: Database Setup

```bash
# Create PostgreSQL database
createdb medusa-db

# Run Medusa migrations
cd packages/medusa-backend
pnpm run migrations

# Seed with sample data
pnpm run seed
```

## Step 9: Run the Development Environment

```bash
# From the root directory
pnpm install

# Run all apps in development mode
pnpm run dev

# Or run specific apps
pnpm run dev --filter=storefront
pnpm run dev --filter=medusa-backend
```

The apps will be available at:
- Storefront: http://localhost:3000
- Medusa Admin: http://localhost:9000/app
- Medusa API: http://localhost:9000

## Next Steps

1. **Customize Medusa Admin**: Add fragrance-specific fields to product forms
2. **Build Product Pages**: Create detailed product pages with scent notes visualization
3. **Implement Filters**: Add advanced filtering for fragrance families, notes, etc.
4. **Add Checkout**: Implement full checkout flow with Stripe
5. **Create Collections**: Build collection pages for categories
6. **Add Search**: Implement product search functionality
7. **Optimize Images**: Set up image optimization for product photos
8. **SEO**: Add meta tags, structured data, and sitemap generation
9. **Testing**: Add unit and E2E tests
10. **Deployment**: Set up CI/CD and deploy to production

## Useful Commands

```bash
# Install dependencies across all packages
pnpm install

# Add a dependency to a specific package
pnpm add <package> --filter=storefront

# Build all packages
pnpm run build

# Clean all node_modules and build artifacts
pnpm run clean

# Type check all packages
pnpm run type-check

# Lint all packages
pnpm run lint
```
