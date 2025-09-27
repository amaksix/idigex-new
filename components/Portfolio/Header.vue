<template>
  <header class="portfolio-header section-padding ontop main-bg">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div :class="`cont ${isCenter ? 'text-center' : ''}`">
            <h1 class="fz-80 fw-500">{{ t('portfolio.title') }}</h1>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
// Import both the t() function via useI18n AND the localePath function via useLocalePath

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
const { isCenter } = defineProps(['isCenter'])
</script>