<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <PortfolioInteractiveFull />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Interactive Full`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>
