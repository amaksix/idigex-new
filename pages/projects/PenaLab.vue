<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <ProjectPenaLabHeader />
          <ProjectPenaLabTopContent />
          <ProjectPenaLabImageColumn />
          <ProjectPenaLabBottomContent />
          <ProjectPenaLabWorks />
          <ProjectPenaLabContent2 />
        </div>
        <ProjectPenaLabNextProject />
      </main>
      <CommonFooter1 />
      <CommonPrivacyPolicy />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `Project PenaLab`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>
