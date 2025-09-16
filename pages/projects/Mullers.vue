
<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <ProjectMullersHeader />
          <ProjectMullersTopContent />
          <ProjectMullersImageColumn />
          <ProjectMullersBottomContent />
          <ProjectMullersBottomImage />
          <ProjectMullersContent2 />
        </div>
        <ProjectMullersNextProject />
      </main>
      <CommonFooter1 />
        <CommonPrivacyPolicy />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `Project Mullers`,
  bodyAttrs: {
    class: 'main-bg'
  }
});
</script>

