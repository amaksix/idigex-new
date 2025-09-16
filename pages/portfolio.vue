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
useHead({
    title: 'IDigex - Portfolio',
  meta: [
    {
      name: 'description',
      content: 'IDigex ir digitālā aģentūra, kas specializējas mājaslapu izstrādē, UI/UX dizainā, logotipu un zīmolu izstrādē.'
    },
    // Open Graph Tags
    {
      property: 'og:title',
      content: 'IDigex - Jūsu digitālo risinājumu partneris'
    },
    {
      property: 'og:description',
      content: 'IDigex ir digitālā aģentūra, kas specializējas mājaslapu izstrādē, UI/UX dizainā, logotipu un zīmolu izstrādē.'
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
      content: 'IDigex - Your Digital Solution Partner'
    },
    {
      name: 'twitter:description',
      content: 'IDigex ir digitālā aģentūra, kas specializējas mājaslapu izstrādē, UI/UX dizainā, logotipu un zīmolu izstrādē.'
    }
  ],
});
</script>
