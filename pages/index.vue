


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

useHead({
  title: 'IDigex',
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
    link: [
    {
      rel: "stylesheet",
      href: '/assets/css/base.css'
    }
  ],
    script: [
    { src: "/assets/js/charming.min.js" },
    { src: "/assets/js/TweenMax.min.js" },
 
  ]
});

</script>