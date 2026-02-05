<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '~/components/ui/accordion'

definePageMeta({
  title: 'FAQ'
})

const faqs = [
  {
    question: 'How do I find the right fragrance for me?',
    answer: 'We recommend starting with our fragrance families (Floral, Woody, Oriental, Fresh, Citrus, Aromatic) to identify your preferences. Each product page includes detailed notes and characteristics to help guide your choice. For personalized recommendations, contact our fragrance consultants.'
  },
  {
    question: 'Are all your fragrances authentic?',
    answer: 'Absolutely. We only source directly from authorized distributors and brand partners. Every fragrance sold at Ilyo is 100% authentic and comes with a satisfaction guarantee.'
  },
  {
    question: 'What is the difference between EDP, EDT, and Parfum?',
    answer: 'The concentration of fragrance oils determines the intensity and longevity. Parfum (20-30%) lasts longest, Eau de Parfum (15-20%) offers excellent longevity, Eau de Toilette (5-15%) is lighter and suitable for daily wear, and Eau de Cologne (2-5%) is the most refreshing but requires reapplication.'
  },
  {
    question: 'How should I store my fragrances?',
    answer: 'Store fragrances in a cool, dry place away from direct sunlight and extreme temperatures. Keep the bottle tightly closed when not in use. Properly stored, most fragrances will maintain their quality for 3-5 years.'
  },
  {
    question: 'Do you offer samples?',
    answer: 'Yes! We include complimentary samples with every order. You can also purchase sample sets to try multiple fragrances before committing to a full-size bottle.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns of unopened items within 30 days of delivery. For opened fragrances, we offer a satisfaction guarantee—if you\'re not happy with your purchase, contact us and we\'ll work with you to find a solution.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) is available at checkout. International shipping times vary by destination. All orders include tracking information.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. International shipping rates and delivery times are calculated at checkout based on your location.'
  }
]
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-3xl">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">Frequently Asked Questions</h1>
        <p class="text-lg text-muted-foreground">
          Find answers to common questions about our products and services
        </p>
      </header>

      <Accordion type="single" collapsible class="w-full">
        <AccordionItem v-for="(faq, index) in faqs" :key="index" :value="`item-${index}`">
          <AccordionTrigger class="text-left">
            {{ faq.question }}
          </AccordionTrigger>
          <AccordionContent>
            <p class="text-muted-foreground">{{ faq.answer }}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div class="mt-16 text-center p-8 bg-secondary/50 rounded-lg">
        <h2 class="text-xl font-medium mb-2">Still have questions?</h2>
        <p class="text-muted-foreground mb-4">Our team is here to help</p>
        <NuxtLink
          to="/contact"
          class="inline-flex items-center justify-center rounded-md text-sm font-medium bg-gold-600 text-white hover:bg-gold-700 h-10 px-6 transition-colors"
        >
          Contact Us
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
