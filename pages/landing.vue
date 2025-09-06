<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <LandingHeader />
          <LandingAbout />
          <LandingWorks />
          <LandingMarquee />
          <LandingBrands />
          <LandingAccordions />
          <LandingBlog />
        </div>
        <LandingContact />
      </main>
      <CommonFooter1 />
    </div>
  </div>
</template>

<script setup>
//= Page Head
useHead({
  titleTemplate: `%s - Landing`,
  bodyAttrs: {
    class: 'landing'
  },
  link: [
    {
      rel: "stylesheet",
      href: '/assets/css/base.css'
    }
  ],
  script: [
    { src: "/assets/js/TweenMax.min.js" },
    { src: "/assets/js/charming.min.js" },
    { src: "/assets/js/smoother-script.js", defer: true }
  ]
});
</script>
