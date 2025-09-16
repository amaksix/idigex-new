<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <ProjectViaBonHeader />
          <ProjectViaBonTopContent />
          <ProjectViaBonImageColumn />
          <ProjectViaBonBottomContent />
          <ProjectViaBonBottomImage />
          <ProjectViaBonContent2 />
        </div>
        <ProjectViaBonNextProject />
      </main>
      <CommonFooter1 />
      <CommonPrivacyPolicy />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `Project ViaBon`,
  bodyAttrs: {
    class: 'main-bg'
  },
});
</script>
