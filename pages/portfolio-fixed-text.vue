<template>
  <CommonLoader />
  <CommonNavbar />
  <CommonMenu />
  <main class="main-bg">
    <PortfolioHeader :isCenter="true" />
    <PortfolioFixedText />
  </main>
  <CommonFooter1 :subBg="true" />
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Portfolio Fixed Text`
});
</script>
