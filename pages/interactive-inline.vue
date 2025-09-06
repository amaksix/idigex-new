<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <PortfolioInteractiveInline />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Interactive Inline`,
  bodyAttrs: {
    class: 'main-bg'
  },
  link: [
    { rel: "stylesheet", href: "/assets/css/base.css" }
  ]
});
</script>
