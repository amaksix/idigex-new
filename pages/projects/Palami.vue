<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <ProjectPalamiHeader />
          <ProjectPalamiTopContent />
          <ProjectPalamiImageColumn />
          <ProjectPalamiBottomContent />
          <ProjectPalamiBottomImage />
          <ProjectPalamiContent2 />
        </div>
        <ProjectPalamiNextProject />
      </main>
      <CommonFooter1 />
      <CommonPrivacyPolicy />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Project Palami`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>
