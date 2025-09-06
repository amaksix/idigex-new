<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <PortfolioCarouselSlider />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Carousel Slider`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>
