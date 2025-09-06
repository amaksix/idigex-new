<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <PortfolioFullscreen />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Fullscreen`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>
