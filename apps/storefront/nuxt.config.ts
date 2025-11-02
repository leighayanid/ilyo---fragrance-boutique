// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
  ],

  runtimeConfig: {
    public: {
      medusaUrl: process.env.NUXT_PUBLIC_MEDUSA_URL || 'http://localhost:9000',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    }
  },

  app: {
    head: {
      title: 'Ilyo Fragrance Boutique',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Luxury fragrance e-commerce boutique' }
      ],
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  }
})
