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
const servicesFiles = import.meta.glob('/data/services/*/*.json', { eager: true });

import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";

const route = useRoute();
const { locale } = useI18n();
const slug = route.params.slug

// Find the matching JSON file
const serviceEntry = Object.entries(servicesFiles).find(([path, content]) => {
  return path.includes(`/${locale.value}/`) && path.endsWith(`${slug}.json`);
});

const service = serviceEntry ? serviceEntry[1] : null

if (!service) {
  throw createError({ statusCode: 404, statusMessage: 'Service not found' })
}

// ==========================
// Page Head
// ==========================
useHead({
    title: `${service.headtitle}`,
  meta: [
    {
      name: 'description',
      content: `${service.description}`
    },
    // Open Graph Tags
    {
      property: 'og:title',
      content: `${service.headtitle}`
    },
    {
      property: 'og:description',
      content: `${service.description}`
    },
    {
      property: 'og:image',
      content: 'https://www.idigex.com/public/assets/imgs/Logo_IDigex.svg' // Use an absolute URL
    },
    {
      property: 'og:url',
      content: 'https://www.idigex.com/'
    },
    // Twitter Card Tags
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content:`${service.headtitle}`
    },
    {
      name: 'twitter:description',
      content: `${service.description}`
    }
  ],
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
