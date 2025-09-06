<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <PortfolioCreativeSlider />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Creative Slider`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>
