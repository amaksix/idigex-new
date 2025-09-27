<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <main class="main-bg">
    <PortfolioHeader :isCenter="true" />
    <PortfolioGridClassic />
  </main>
  <CommonFooter1 :subBg="true" />
  <CommonPrivacyPolicy />
</template>

<script setup>
//= Page Head

const { t, locale } = useI18n()
useHead({
    title: 'IDigex - Portfolio',
  meta: [
    {
      name: 'description',
      content: t('metaTags.portfolio.description')
    },
    // Open Graph Tags
    {
      property: 'og:title',
      content: t('metaTags.portfolio.ogTitle')
    },
    {
      property: 'og:description',
      content: t('metaTags.portfolio.description')
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
      content: t('metaTags.portfolio.ogTitle')
    },
    {
      name: 'twitter:description',
      content: t('metaTags.portfolio.description')
    }
  ],
});
</script>
