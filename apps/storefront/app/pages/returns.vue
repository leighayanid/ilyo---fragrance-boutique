<script setup lang="ts">
import { RotateCcw, CheckCircle, AlertCircle } from 'lucide-vue-next'

definePageMeta({
  title: 'Returns & Exchanges'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">Returns & Exchanges</h1>
        <p class="text-lg text-muted-foreground">
          Our hassle-free return policy
        </p>
      </header>

      <div class="bg-gold-50 border border-gold-200 rounded-lg p-6 mb-12">
        <div class="flex items-start gap-4">
          <RotateCcw class="w-6 h-6 text-gold-600 flex-shrink-0 mt-1" />
          <div>
            <h2 class="text-lg font-medium mb-2">30-Day Satisfaction Guarantee</h2>
            <p class="text-muted-foreground">
              We want you to love your purchase. If you're not completely satisfied, we'll make it right.
            </p>
          </div>
        </div>
      </div>

      <div class="prose prose-lg max-w-none">
        <section class="mb-12">
          <h2 class="text-2xl font-serif font-medium mb-6">Return Policy</h2>
          <p class="text-muted-foreground mb-4">
            We accept returns within 30 days of delivery for a full refund. To be eligible for a return,
            items must be:
          </p>
          <ul class="space-y-3 text-muted-foreground">
            <li class="flex items-start gap-3">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>In original, unopened packaging</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Unused and in resellable condition</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Accompanied by original receipt or proof of purchase</span>
            </li>
          </ul>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-serif font-medium mb-6">Opened Products</h2>
          <p class="text-muted-foreground mb-4">
            We understand that sometimes a fragrance just isn't right for you. For opened products,
            we offer:
          </p>
          <ul class="space-y-3 text-muted-foreground">
            <li class="flex items-start gap-3">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Store credit for the full purchase amount</span>
            </li>
            <li class="flex items-start gap-3">
              <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Exchange for a different fragrance of equal or lesser value</span>
            </li>
          </ul>
          <p class="text-muted-foreground mt-4">
            Products must be at least 80% full to qualify for store credit or exchange.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-serif font-medium mb-6">Non-Returnable Items</h2>
          <ul class="space-y-3 text-muted-foreground">
            <li class="flex items-start gap-3">
              <AlertCircle class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Sample sets and discovery kits</span>
            </li>
            <li class="flex items-start gap-3">
              <AlertCircle class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Gift cards</span>
            </li>
            <li class="flex items-start gap-3">
              <AlertCircle class="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>Items marked as final sale</span>
            </li>
          </ul>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-serif font-medium mb-6">How to Return</h2>
          <ol class="space-y-4 text-muted-foreground">
            <li>
              <strong class="text-foreground">1. Contact Us</strong>
              <p>Email us at returns@ilyo.com with your order number and reason for return.</p>
            </li>
            <li>
              <strong class="text-foreground">2. Receive Return Label</strong>
              <p>We'll send you a prepaid return shipping label via email.</p>
            </li>
            <li>
              <strong class="text-foreground">3. Ship Your Return</strong>
              <p>Pack items securely and drop off at any shipping location.</p>
            </li>
            <li>
              <strong class="text-foreground">4. Receive Refund</strong>
              <p>Refunds are processed within 5-7 business days of receiving your return.</p>
            </li>
          </ol>
        </section>

        <section>
          <h2 class="text-2xl font-serif font-medium mb-6">Damaged or Incorrect Items</h2>
          <p class="text-muted-foreground">
            If you receive a damaged or incorrect item, please contact us immediately at
            <a href="mailto:support@ilyo.com" class="text-gold-600 hover:underline">support@ilyo.com</a>.
            Include photos of the damage and we'll arrange for a replacement or full refund at no
            additional cost to you.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
