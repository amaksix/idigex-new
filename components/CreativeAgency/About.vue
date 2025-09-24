<template>
  <section class="about section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-11">
          <span class="sub-title bord mb-30">{{ t('home.about.sub_title') }}</span>
          <h3 class="text-u text-indent ls1">{{ t('home.about.heading') }}</h3>
        </div>
        <div class="col-lg-7 offset-lg-5">
          <div class="text mt-50">
            <p>{{ t('home.about.paragraph') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
// Import both the t() function via useI18n AND the localePath function via useLocalePath
  import { useI18n, useLocalePath } from '#i18n'

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
</script>
