<script setup lang="ts">
definePageMeta({
  title: 'Terms of Service'
})
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-4xl">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">Terms of Service</h1>
        <p class="text-muted-foreground">Last updated: {{ new Date().toLocaleDateString() }}</p>
      </header>

      <div class="prose prose-lg max-w-none text-muted-foreground">
        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Agreement to Terms</h2>
          <p>
            By accessing or using the Ilyo Fragrance Boutique website, you agree to be bound by these
            Terms of Service. If you do not agree to these terms, please do not use our website or services.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Use of Our Service</h2>
          <p>You agree to use our website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use the service in any way that violates applicable laws or regulations</li>
            <li>Attempt to gain unauthorized access to any part of the service</li>
            <li>Use the service to transmit harmful or malicious code</li>
            <li>Interfere with or disrupt the service or servers</li>
            <li>Collect or harvest information about other users</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Account Registration</h2>
          <p>
            To access certain features, you may need to create an account. You are responsible for:
          </p>
          <ul>
            <li>Maintaining the confidentiality of your account credentials</li>
            <li>All activities that occur under your account</li>
            <li>Providing accurate and complete information</li>
            <li>Updating your information to keep it current</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Products and Pricing</h2>
          <p>
            We strive to display accurate product information and pricing. However, we reserve the right to:
          </p>
          <ul>
            <li>Correct any errors in pricing or product descriptions</li>
            <li>Cancel orders if pricing errors are discovered</li>
            <li>Limit quantities available for purchase</li>
            <li>Modify or discontinue products without notice</li>
          </ul>
          <p class="mt-4">All prices are displayed in USD unless otherwise noted.</p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Orders and Payment</h2>
          <p>
            By placing an order, you represent that you are authorized to use the payment method provided.
            We reserve the right to refuse or cancel any order for any reason, including:
          </p>
          <ul>
            <li>Product availability issues</li>
            <li>Suspected fraudulent activity</li>
            <li>Errors in pricing or product information</li>
          </ul>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, images, and software, is the
            property of Ilyo Fragrance Boutique or its content suppliers and is protected by intellectual
            property laws. You may not reproduce, distribute, or create derivative works without our
            express written consent.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Ilyo Fragrance Boutique shall not be liable for
            any indirect, incidental, special, consequential, or punitive damages arising from your
            use of our services or products.
          </p>
        </section>

        <section class="mb-10">
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms at any time. Changes will be effective immediately
            upon posting to the website. Your continued use of the service after changes are posted
            constitutes your acceptance of the modified Terms.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-serif font-medium text-foreground mb-4">Contact Us</h2>
          <p>
            If you have questions about these Terms, please contact us at
            <a href="mailto:legal@ilyo.com" class="text-gold-600 hover:underline">legal@ilyo.com</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
