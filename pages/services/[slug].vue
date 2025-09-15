<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <!-- Reusable header component -->
          <ServiceHeader 
            :title="service.title" 
            :subtitle="service.subtitle" 
            :image="service.image" 
          />
          
          <!-- Reusable sections -->
          <ServiceAbout :about="service.about" />
          <ServiceFAQ :faq="service.faq" />
          <ServiceWorks :works="service.works" />
        </div>

      <ServiceContact/>
      </main>
      <CommonFooter1 />
        <CommonPrivacyPolicy />
    </div>
  </div>
</template>

<script setup>
import ServiceHeader from '~/components/services/Header.vue'
import ServiceAbout from '~/components/services/About.vue'
import ServiceFAQ from '~/components/services/FAQ.vue'
import ServiceWorks from '~/components/services/Works.vue'
import ServiceContact from '~/components/services/Contact.vue'
// ==========================
// Load all JSON services
// ==========================
const servicesFiles = import.meta.glob('/data/services/*.json', { eager: true })

// Get the slug from the URL
const route = useRoute()
const slug = route.params.slug

// Find the matching JSON file
const serviceEntry = Object.entries(servicesFiles).find(([path, content]) =>
  path.endsWith(`${slug}.json`)
)

const service = serviceEntry ? serviceEntry[1] : null

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

// ==========================
// Page Head
// ==========================
useHead({
  titleTemplate: `%s - ${service.title}`,
  bodyAttrs: { class: 'main-bg' },
  link: [
    { rel: 'stylesheet', href: '/assets/css/base.css' }
  ],
  script: [
    { src: "/assets/js/TweenMax.min.js" },
    { src: "/assets/js/charming.min.js" },
  ]
})
</script>
