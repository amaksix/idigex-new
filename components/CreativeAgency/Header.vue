<template>
  <header class="crev-header">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12">
          <div class="caption text-center">
            <h1 class="f-xbold"><span class="f-ultra-light d-block"> {{ t('home.header.header01') }}</span> {{ t('home.header.header02') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="img mt-50">
      <img src="/imgs/Main banner-min.jpg" alt="" />
    </div>
  </header>
</template>
<script setup>
// Import both the t() function via useI18n AND the localePath function via useLocalePath

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
</script>
