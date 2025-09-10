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
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Project ViaBon`,
  bodyAttrs: {
    class: 'main-bg'
  },
  script: [
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
