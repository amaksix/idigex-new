<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <main class="main-bg">
    <PortfolioHeader :isCenter="true" />
    <PortfolioGrid />
  </main>
  <CommonFooter1 :subBg="true" />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Grid`
});
</script>
