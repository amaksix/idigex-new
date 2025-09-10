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
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - About`,
  bodyAttrs: {
    class: 'main-bg'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
