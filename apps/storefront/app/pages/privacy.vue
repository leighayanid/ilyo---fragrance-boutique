<script setup lang="ts">
definePageMeta({
  title: 'Privacy Policy'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">Privacy Policy</h1>
        <p class="text-muted-foreground">Last updated: {{ new Date().toLocaleDateString() }}</p>
      </header>

      <div class="prose prose-lg max-w-none text-muted-foreground">
        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Introduction</h2>
          <p>
            Ilyo Fragrance Boutique ("we", "our", or "us") is committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
            when you visit our website or make a purchase.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Information We Collect</h2>
          <h3 class="text-lg font-medium text-foreground mt-6 mb-3">Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide, including:</p>
          <ul>
            <li>Name and contact information (email, phone, address)</li>
            <li>Payment information (processed securely through our payment providers)</li>
            <li>Account credentials</li>
            <li>Order history and preferences</li>
          </ul>

          <h3 class="text-lg font-medium text-foreground mt-6 mb-3">Automatically Collected Information</h3>
          <p>When you visit our site, we may automatically collect:</p>
          <ul>
            <li>Device and browser information</li>
            <li>IP address and location data</li>
            <li>Browsing behavior and preferences</li>
            <li>Referring URLs and search terms</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about orders, products, and services</li>
            <li>Personalize your shopping experience</li>
            <li>Improve our website and services</li>
            <li>Send marketing communications (with your consent)</li>
            <li>Prevent fraud and enhance security</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Information Sharing</h2>
          <p>We may share your information with:</p>
          <ul>
            <li>Service providers who assist in our operations (shipping, payment processing)</li>
            <li>Analytics providers to help us understand site usage</li>
            <li>Law enforcement when required by law</li>
          </ul>
          <p class="mt-4">We do not sell your personal information to third parties.</p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Request deletion of your information</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent where processing is based on consent</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction. However,
            no method of transmission over the Internet is 100% secure.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at
            <a href="mailto:privacy@ilyo.com" class="text-gold-600 hover:underline">privacy@ilyo.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
