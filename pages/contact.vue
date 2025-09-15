<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <ContactForm />
      </main>
      <CommonFooter1 :subBg="true" />
        <CommonPrivacyPolicy />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Contact`,
  bodyAttrs: {
    class: 'main-bg'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
