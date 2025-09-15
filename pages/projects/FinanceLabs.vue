<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <ProjectFinanceLabsHeader />
          <ProjectFinanceLabsTopContent />
          <ProjectFinanceLabsImageColumn />
          <ProjectFinanceLabsBottomContent />
          <ProjectFinanceLabsBottomImage />
          <ProjectFinanceLabsContent2 />
        </div>
        <ProjectFinanceLabsNextProject />
      </main>
      <CommonFooter1 />
        <CommonPrivacyPolicy />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Project FinanceLabs`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>
