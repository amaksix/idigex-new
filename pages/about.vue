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
//= Page Head
useHead({
   title: 'IDigex - Par Mums',
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
  bodyAttrs: {
    class: 'main-bg'
  },

});
</script>
