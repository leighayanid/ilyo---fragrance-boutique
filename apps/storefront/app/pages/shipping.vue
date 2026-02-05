<script setup lang="ts">
import { Package, Truck, Globe, Clock } from 'lucide-vue-next'

definePageMeta({
  title: 'Shipping Information'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">Shipping Information</h1>
        <p class="text-lg text-muted-foreground">
          Everything you need to know about delivery
        </p>
      </header>

      <div class="grid md:grid-cols-2 gap-8 mb-16">
        <div class="p-6 border rounded-lg">
          <Package class="w-8 h-8 text-gold-600 mb-4" />
          <h2 class="text-xl font-medium mb-2">Free Standard Shipping</h2>
          <p class="text-muted-foreground">On all orders over $100</p>
        </div>
        <div class="p-6 border rounded-lg">
          <Truck class="w-8 h-8 text-gold-600 mb-4" />
          <h2 class="text-xl font-medium mb-2">Express Delivery</h2>
          <p class="text-muted-foreground">1-2 business days available</p>
        </div>
        <div class="p-6 border rounded-lg">
          <Globe class="w-8 h-8 text-gold-600 mb-4" />
          <h2 class="text-xl font-medium mb-2">International Shipping</h2>
          <p class="text-muted-foreground">Shipping to 50+ countries</p>
        </div>
        <div class="p-6 border rounded-lg">
          <Clock class="w-8 h-8 text-gold-600 mb-4" />
          <h2 class="text-xl font-medium mb-2">Order Tracking</h2>
          <p class="text-muted-foreground">Real-time updates on every order</p>
        </div>
      </div>

      <div class="prose prose-lg max-w-none">
        <section class="mb-12">
          <h2 class="text-2xl font-serif font-medium mb-6">Domestic Shipping</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b">
                  <th class="text-left py-3 font-medium">Shipping Method</th>
                  <th class="text-left py-3 font-medium">Delivery Time</th>
                  <th class="text-left py-3 font-medium">Cost</th>
                </tr>
              </thead>
              <tbody class="text-muted-foreground">
                <tr class="border-b">
                  <td class="py-3">Standard Shipping</td>
                  <td class="py-3">3-5 business days</td>
                  <td class="py-3">$5.99 (Free over $100)</td>
                </tr>
                <tr class="border-b">
                  <td class="py-3">Express Shipping</td>
                  <td class="py-3">1-2 business days</td>
                  <td class="py-3">$14.99</td>
                </tr>
                <tr>
                  <td class="py-3">Overnight Shipping</td>
                  <td class="py-3">Next business day</td>
                  <td class="py-3">$24.99</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-serif font-medium mb-6">International Shipping</h2>
          <p class="text-muted-foreground mb-4">
            We ship to most countries worldwide. International shipping rates are calculated at checkout
            based on your location and order weight. Please note that international orders may be subject
            to customs duties and taxes, which are the responsibility of the recipient.
          </p>
          <p class="text-muted-foreground">
            Typical delivery times for international orders range from 7-21 business days depending
            on the destination country and customs processing times.
          </p>
        </section>

        <section class="mb-12">
          <h2 class="text-2xl font-serif font-medium mb-6">Order Processing</h2>
          <p class="text-muted-foreground mb-4">
            Orders are processed Monday through Friday, excluding holidays. Orders placed before
            2:00 PM EST typically ship the same business day. Orders placed after this time or on
            weekends will be processed the next business day.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-serif font-medium mb-6">Tracking Your Order</h2>
          <p class="text-muted-foreground">
            Once your order ships, you'll receive an email with tracking information. You can also
            track your order by logging into your account or contacting our customer service team.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
