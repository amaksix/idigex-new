<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <PortfolioInteractiveCenter />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Interactive Center`,
  bodyAttrs: {
    class: 'main-bg'
  },
  link: [
    { rel: "stylesheet", href: "/assets/css/base.css" }
  ]
});
</script>
