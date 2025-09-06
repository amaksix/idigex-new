<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <ContactHeader />
        <ContactInfo />
        <ContactForm />
      </main>
      <CommonFooter1 :subBg="true" />
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
