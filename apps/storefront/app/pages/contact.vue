<script setup lang="ts">
import { Mail, Phone, MapPin } from 'lucide-vue-next'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

definePageMeta({
  title: 'Contact Us'
})

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitted = ref(false)
const isSubmitting = ref(false)

async function handleSubmit() {
  isSubmitting.value = true
  // Simulate form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  isSubmitted.value = true
}
</script>

<template>
  <div class="min-h-screen pt-24 pb-16">
    <div class="container mx-auto px-4 max-w-5xl">
      <header class="text-center mb-16">
        <h1 class="text-4xl md:text-5xl font-serif font-medium mb-4">Contact Us</h1>
        <p class="text-lg text-muted-foreground">
          We'd love to hear from you
        </p>
      </header>

      <div class="grid md:grid-cols-2 gap-16">
        <div>
          <h2 class="text-2xl font-serif font-medium mb-6">Get in Touch</h2>

          <div class="space-y-6 mb-8">
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail class="w-5 h-5 text-gold-600" />
              </div>
              <div>
                <h3 class="font-medium mb-1">Email</h3>
                <a href="mailto:hello@ilyo.com" class="text-muted-foreground hover:text-gold-600 transition-colors">
                  hello@ilyo.com
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Phone class="w-5 h-5 text-gold-600" />
              </div>
              <div>
                <h3 class="font-medium mb-1">Phone</h3>
                <a href="tel:+1234567890" class="text-muted-foreground hover:text-gold-600 transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-10 h-10 bg-gold-100 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin class="w-5 h-5 text-gold-600" />
              </div>
              <div>
                <h3 class="font-medium mb-1">Address</h3>
                <p class="text-muted-foreground">
                  123 Fragrance Lane<br>
                  New York, NY 10001
                </p>
              </div>
            </div>
          </div>

          <h3 class="font-medium mb-4">Business Hours</h3>
          <div class="text-muted-foreground space-y-1">
            <p>Monday - Friday: 9am - 6pm</p>
            <p>Saturday: 10am - 4pm</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div>
          <h2 class="text-2xl font-serif font-medium mb-6">Send a Message</h2>

          <div v-if="isSubmitted" class="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <p class="text-green-800 font-medium mb-2">Thank you for your message!</p>
            <p class="text-green-700 text-sm">We'll get back to you as soon as possible.</p>
          </div>

          <form v-else class="space-y-6" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <Label for="name">Name</Label>
              <Input id="name" v-model="form.name" required />
            </div>

            <div class="space-y-2">
              <Label for="email">Email</Label>
              <Input id="email" v-model="form.email" type="email" required />
            </div>

            <div class="space-y-2">
              <Label for="subject">Subject</Label>
              <Input id="subject" v-model="form.subject" required />
            </div>

            <div class="space-y-2">
              <Label for="message">Message</Label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <Button type="submit" class="w-full" :disabled="isSubmitting">
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </Button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
