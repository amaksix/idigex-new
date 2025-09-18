<template>
  <header class="about-header section-padding pb-0">
    <div class="container ">
      <div class="row">
        <div class="col-lg-9 offset-lg-1">
          <div class="cont">
            <h6 class="sub-title mb-15">{{ t('about.sub_title') }}</h6>
            <h1 class="text-u">{{ t('about.title') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="img mt-80" data-overlay-dark="4">
      <img src="/assets/imgs/About_banner.jpg" alt="" />
    </div>
  </header>
</template>
<script setup>
// Import both the t() function via useI18n AND the localePath function via useLocalePath
  import { useI18n, useLocalePath } from '#i18n'

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
</script>