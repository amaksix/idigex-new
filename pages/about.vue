<template>
  <CommonLoader />
  <div id="wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="content">
      <main class="main-bg">
        <AboutHeader />
        <AboutIntro />
      </main>
      <CommonFooter1 />
        <CommonPrivacyPolicy />
    </div>
  </div>
</template>

<script setup>

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
//= Page Head
useHead({
   title: 'IDigex - Par Mums',
  meta: [
    {
      name: 'description',
      content: t('metaTags.about.description')
    },
    // Open Graph Tags
    {
      property: 'og:title',
      content: t('metaTags.about.ogTitle')
    },
    {
      property: 'og:description',
      content: t('metaTags.about.description')
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
      content: t('metaTags.about.ogTitle')
    },
    {
      name: 'twitter:description',
      content: t('metaTags.about.description')
    }
  ],
  bodyAttrs: {
    class: 'main-bg'
  },

});
</script>
