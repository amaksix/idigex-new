<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <BlogDetailsHeader />
        <BlogDetails />
      </main>
      <CommonFooter1 :subBg="true" />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Blog Details`,
  bodyAttrs: {
    class: "main-bg",
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true },
    { src: "https://kit.fontawesome.com/d8d8f76b04.js" },
  ],
});
</script>
