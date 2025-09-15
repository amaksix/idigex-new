


<template>
  <CommonLoader />
  <div id="smooth-wrapper">
    <CommonNavbar />
    <CommonMenu />
    <div id="smooth-content">
      <main class="main-bg">
        <div class="main-box main-bg ontop">
          <CreativeAgencyHeader />
          <CreativeAgencyAbout />
          <CreativeAgencyServices />
          <CreativeAgencyWorks />
          <CreativeAgencyBrief />
          <CreativeAgencyFAQ />
        </div>
        <CreativeAgencyContact />
      </main>
      <CommonFooter1 />
      <CommonPrivacyPolicy />
    </div>
  </div>
</template>


<script setup>
//= Page Head

useHead({
  titleTemplate: `%s`,
  bodyAttrs: {
    class: 'main-bg'
  },
    link: [
    {
      rel: "stylesheet",
      href: '/assets/css/base.css'
    }
  ],
    script: [
    { src: "/assets/js/charming.min.js" },
    { src: "/assets/js/TweenMax.min.js" },
 
  ]
});

</script>