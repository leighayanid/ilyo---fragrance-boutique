<script setup lang="ts">
definePageMeta({
  title: 'Cookie Policy'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">Cookie Policy</h1>
        <p class="text-muted-foreground">Last updated: {{ new Date().toLocaleDateString() }}</p>
      </header>

      <div class="prose prose-lg max-w-none text-muted-foreground">
        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to
            website owners.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">How We Use Cookies</h2>
          <p>We use cookies to:</p>
          <ul>
            <li>Remember your preferences and settings</li>
            <li>Keep you signed in to your account</li>
            <li>Remember items in your shopping cart</li>
            <li>Understand how you use our website</li>
            <li>Improve your browsing experience</li>
            <li>Deliver relevant advertising</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Types of Cookies We Use</h2>

          <h3 class="text-lg font-medium text-foreground mt-6 mb-3">Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable core
            functionality such as security, network management, and account access. You cannot
            opt out of these cookies.
          </p>

          <h3 class="text-lg font-medium text-foreground mt-6 mb-3">Performance Cookies</h3>
          <p>
            These cookies help us understand how visitors interact with our website by collecting
            and reporting information anonymously. This helps us improve our website's performance.
          </p>

          <h3 class="text-lg font-medium text-foreground mt-6 mb-3">Functionality Cookies</h3>
          <p>
            These cookies allow the website to remember choices you make (such as your preferred
            language or region) and provide enhanced, personalized features.
          </p>

          <h3 class="text-lg font-medium text-foreground mt-6 mb-3">Marketing Cookies</h3>
          <p>
            These cookies are used to track visitors across websites to display relevant
            advertisements. They may be set by us or by third-party advertising partners.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Third-Party Cookies</h2>
          <p>
            We may use third-party services that set cookies on our behalf, including:
          </p>
          <ul>
            <li>Google Analytics for website analytics</li>
            <li>Payment processors for secure transactions</li>
            <li>Social media platforms for sharing features</li>
            <li>Advertising networks for relevant ads</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Managing Cookies</h2>
          <p>
            Most web browsers allow you to control cookies through their settings. You can:
          </p>
          <ul>
            <li>View cookies stored on your device</li>
            <li>Delete existing cookies</li>
            <li>Block cookies from being set</li>
            <li>Set preferences for certain websites</li>
          </ul>
          <p class="mt-4">
            Please note that blocking or deleting cookies may affect your experience on our website
            and prevent certain features from working properly.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Contact Us</h2>
          <p>
            If you have questions about our use of cookies, please contact us at
            <a href="mailto:privacy@ilyo.com" class="text-gold-600 hover:underline">privacy@ilyo.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
