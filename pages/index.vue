


<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <CreativeAgencyHeader />
          <CreativeAgencyAbout />
          <CreativeAgencyServices />
          <CreativeAgencyWorks />
          <CreativeAgencyBrief />
          <CreativeAgencyFAQ />
        </div>
        <CreativeAgencyContact />
      </main>
      <CommonFooter1 />
      <CommonPrivacyPolicy />
    </div>
  </div>
</template>


<script setup>
//= Page Head

const { t, locale } = useI18n()
useHead({
  title: 'IDigex',
  meta: [
    {
      name: 'description',
      content: t('metaTags.home.description')
    },
    // Open Graph Tags
    {
      property: 'og:title',
      content: t('metaTags.home.ogTitle')
    },
    {
      property: 'og:description',
      content: t('metaTags.home.description')
    },
    {
      property: 'og:image',
      content: 'https://www.idigex.com/public/imgs/Logo_IDigex.svg' // Use an absolute URL
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
      content: t('metaTags.home.ogTitle')
    },
    {
      name: 'twitter:description',
      content: t('metaTags.home.description')
    }
  ],
  bodyAttrs: {
    class: 'main-bg'
  },
    link: [
    {
      rel: "stylesheet",
      href: '/css/base.css'
    }
  ],
    script: [
    { src: "/js/charming.min.js" },
    { src: "/js/TweenMax.min.js" },
 
  ]
});

</script>