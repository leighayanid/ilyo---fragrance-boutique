# Ilyo Fragrance Boutique - Project Plan

## Tech Stack

- **Frontend**: Nuxt 4 (with server-side rendering)
- **UI Framework**: shadcn-vue nuxt
- **E-commerce Backend**: Medusa.js
- **Monorepo**: Turborepo
- **Database**: PostgreSQL (for Medusa)
- **Cache/Session**: Redis (for Medusa)
- **Storage**: S3-compatible storage for product images

## Monorepo Structure

```
ilyo-fragrance-boutique/
├── apps/
│   ├── storefront/          # Nuxt 4 customer-facing app
│   └── admin/               # Medusa admin dashboard (optional custom)
├── packages/
│   ├── medusa-backend/      # Medusa.js e-commerce backend
│   ├── ui/                  # Shared shadcn-vue components
│   ├── types/               # Shared TypeScript types
│   ├── config/              # Shared configs (eslint, tsconfig)
│   └── utils/               # Shared utility functions
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

## Core Features

### 1. Product Catalog
- **Fragrance Listings**
  - Grid/List view toggle
  - Product cards with image, name, brand, price
  - Quick view modal
  - Fragrance families/categories (Floral, Woody, Oriental, Fresh, etc.)

- **Product Detail Pages**
  - High-quality product images with gallery
  - Scent notes visualization (Top, Middle, Base notes)
  - Fragrance pyramid/wheel
  - Detailed descriptions
  - Size/volume variants
  - Stock availability
  - Customer reviews and ratings
  - Related products/recommendations

- **Advanced Filtering**
  - By fragrance family
  - By brand
  - By price range
  - By concentration (EDT, EDP, Parfum, Cologne)
  - By gender (Men's, Women's, Unisex)
  - By notes (Rose, Vanilla, Oud, etc.)
  - By occasion (Day, Night, Office, Date, etc.)

### 2. Shopping Experience
- **Cart Management**
  - Persistent cart (localStorage + Medusa cart)
  - Add to cart with size selection
  - Cart drawer/sidebar
  - Quantity adjustments
  - Remove items
  - Estimated total with shipping

- **Wishlist**
  - Save favorites
  - Share wishlist
  - Move wishlist items to cart

- **Checkout Flow**
  - Guest checkout option
  - Shipping address management
  - Multiple shipping options
  - Payment integration (Stripe/PayPal)
  - Order summary
  - Discount code application

### 3. User Features
- **Authentication**
  - Email/Password signup/login
  - Social auth (Google, optional)
  - Password reset
  - Email verification

- **User Dashboard**
  - Order history
  - Order tracking
  - Saved addresses
  - Wishlist management
  - Profile settings

### 4. Fragrance Discovery
- **Fragrance Finder/Quiz**
  - Interactive questionnaire to recommend fragrances
  - Based on preferences, occasion, season
  - Personalized recommendations

- **Collections**
  - Seasonal collections
  - New arrivals
  - Best sellers
  - Limited editions
  - By brand

- **Search**
  - Full-text search with Medusa
  - Search by brand, notes, name
  - Autocomplete suggestions
  - Recent searches

### 5. Content Pages
- **About/Story**
- **Fragrance Education** (notes guide, concentration guide)
- **Blog** (optional, using Nuxt Content)
- **Contact/Support**
- **FAQ**
- **Shipping & Returns**

## Technical Architecture

### Apps

#### Storefront (Nuxt 4)
```
apps/storefront/
├── app/
│   ├── components/
│   │   ├── product/
│   │   │   ├── ProductCard.vue
│   │   │   ├── ProductGrid.vue
│   │   │   ├── ProductFilters.vue
│   │   │   ├── ProductGallery.vue
│   │   │   └── ScentNotes.vue
│   │   ├── cart/
│   │   │   ├── CartDrawer.vue
│   │   │   ├── CartItem.vue
│   │   │   └── CartSummary.vue
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.vue
│   │   │   ├── ShippingForm.vue
│   │   │   └── PaymentForm.vue
│   │   ├── layout/
│   │   │   ├── Header.vue
│   │   │   ├── Footer.vue
│   │   │   └── Navigation.vue
│   │   └── ui/ (shadcn-vue components)
│   ├── pages/
│   │   ├── index.vue
│   │   ├── products/
│   │   │   ├── index.vue
│   │   │   └── [handle].vue
│   │   ├── collections/
│   │   │   └── [handle].vue
│   │   ├── cart.vue
│   │   ├── checkout.vue
│   │   ├── account/
│   │   │   ├── index.vue
│   │   │   ├── orders.vue
│   │   │   └── settings.vue
│   │   └── about.vue
│   ├── composables/
│   │   ├── useMedusa.ts
│   │   ├── useCart.ts
│   │   ├── useAuth.ts
│   │   └── useProduct.ts
│   ├── server/
│   │   └── api/ (proxy to Medusa if needed)
│   └── utils/
├── public/
└── nuxt.config.ts
```

#### Medusa Backend
```
packages/medusa-backend/
├── src/
│   ├── api/ (custom endpoints)
│   ├── subscribers/
│   ├── models/
│   │   └── fragrance-notes.ts (custom product metadata)
│   ├── migrations/
│   └── services/
├── medusa-config.js
└── package.json
```

### Shared Packages

#### UI Package
- shadcn-vue components
- Custom fragrance-specific components
- Design tokens and theme configuration

#### Types Package
- Medusa entity types
- Product metadata types
- Custom fragrance types (notes, families, etc.)

#### Utils Package
- Price formatting
- Date/time utilities
- Validation helpers
- SEO helpers

## Medusa Customizations

### Custom Product Fields
```typescript
// Product metadata for fragrances
{
  fragrance_family: 'Floral' | 'Woody' | 'Oriental' | 'Fresh',
  concentration: 'EDT' | 'EDP' | 'Parfum' | 'Cologne',
  gender: 'Men' | 'Women' | 'Unisex',
  top_notes: string[],
  middle_notes: string[],
  base_notes: string[],
  longevity: number, // 1-10 scale
  sillage: number, // 1-10 scale
  season: string[], // ['Spring', 'Summer']
  occasion: string[], // ['Day', 'Office', 'Date']
}
```

### Medusa Modules to Use
- **Product Module**: Core product management
- **Cart Module**: Shopping cart
- **Customer Module**: User accounts
- **Order Module**: Order processing
- **Payment Module**: Stripe integration
- **Fulfillment Module**: Shipping
- **Region Module**: Multi-currency/region support
- **Search Module**: Product search
- **Promotion Module**: Discounts and promotions

## UI/UX Design with shadcn-vue

### Design System
- **Color Palette**: Elegant, luxury-focused
  - Primary: Deep purple/burgundy for luxury feel
  - Secondary: Gold/bronze accents
  - Neutral: Warm grays, cream backgrounds

- **Typography**
  - Headings: Serif font for elegance (Playfair Display, Cormorant)
  - Body: Sans-serif for readability (Inter, Plus Jakarta Sans)

- **Components from shadcn-vue**
  - Button, Card, Input, Select (for forms)
  - Dialog, Sheet (for modals, cart drawer)
  - Dropdown Menu (for navigation)
  - Badge, Separator
  - Accordion (for FAQ, product details)
  - Tabs (for product information sections)
  - Carousel (for product images, featured products)
  - Toast (for notifications)

### Key UI Features
- **Product Cards**: Hover effects, quick add to cart, wishlist heart icon
- **Fragrance Visualization**: Visual scent pyramid with notes
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Page transitions, hover states using Nuxt page transitions
- **Loading States**: Skeleton loaders for products

## Development Workflow

### Turborepo Scripts
```json
{
  "scripts": {
    "dev": "turbo run dev",
    "dev:storefront": "turbo run dev --filter=storefront",
    "dev:backend": "turbo run dev --filter=medusa-backend",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "test": "turbo run test",
    "type-check": "turbo run type-check"
  }
}
```

### Pipeline Configuration
```json
// turbo.json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", ".nuxt/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

## Environment Setup

### Required Environment Variables

#### Storefront (.env)
```
NUXT_PUBLIC_MEDUSA_URL=http://localhost:9000
NUXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Medusa Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/medusa
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret
COOKIE_SECRET=your-secret
MEDUSA_ADMIN_ONBOARDING_TYPE=default
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:7001
```

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
- Set up Turborepo monorepo
- Initialize Nuxt 4 storefront
- Set up Medusa backend with PostgreSQL and Redis
- Configure shadcn-vue in Nuxt
- Set up shared packages (types, ui, utils)
- Basic routing structure

### Phase 2: Core E-commerce (Week 3-4)
- Integrate Medusa JS SDK in Nuxt
- Product listing pages
- Product detail pages
- Cart functionality
- Basic checkout flow
- User authentication

### Phase 3: Fragrance Features (Week 5-6)
- Custom product metadata for fragrances
- Scent notes visualization
- Advanced filtering
- Fragrance finder quiz
- Collections pages

### Phase 4: User Experience (Week 7-8)
- User dashboard
- Order management
- Wishlist
- Product reviews
- Search functionality

### Phase 5: Polish & Launch (Week 9-10)
- Performance optimization
- SEO optimization
- Mobile responsiveness
- Payment integration
- Testing
- Deployment setup

## Deployment Strategy

### Storefront
- **Platform**: Vercel or Netlify
- SSR/SSG hybrid with Nuxt
- Edge caching for static assets
- Environment variables configured

### Medusa Backend
- **Platform**: Railway, Render, or DigitalOcean
- Containerized deployment (Docker)
- PostgreSQL managed database
- Redis managed instance
- S3 for media storage

### Monorepo Deployment
- Use Turborepo remote caching
- Deploy apps independently
- Shared packages built before apps

## Performance Considerations

- **Image Optimization**: Nuxt Image for product photos
- **Lazy Loading**: Virtual scrolling for long product lists
- **Code Splitting**: Route-based splitting with Nuxt
- **Caching**: Redis for Medusa, CDN for static assets
- **Database Indexing**: Optimize product queries
- **API Response Time**: Medusa caching layers

## SEO Strategy

- **Dynamic Meta Tags**: Per product/collection pages
- **Structured Data**: Product schema markup
- **Sitemap**: Auto-generated from products
- **Open Graph**: Social sharing optimization
- **Performance**: Core Web Vitals optimization
- **Server-Side Rendering**: Nuxt SSR for SEO-critical pages

## Analytics & Tracking

- Google Analytics 4
- Medusa analytics module
- Conversion tracking
- Product view tracking
- Cart abandonment tracking

## Future Enhancements

- AR fragrance bottle visualization
- Subscription boxes
- Loyalty program
- Multi-language support
- Sample/discovery sets
- Gift wrapping options
- Fragrance layering recommendations
- Social features (share favorites, reviews)
