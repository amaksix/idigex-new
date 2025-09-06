<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <PortfolioInteractiveVertical />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Interactive Vertical`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>
