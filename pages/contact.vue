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
   title: 'IDigex',
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>