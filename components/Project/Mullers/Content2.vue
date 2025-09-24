<template>
  <section class="section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-5">
              <h4 class="mb-50">03 . {{ t('mullers.result_title') }}</h4>
            </div>
            <div class="col-lg-7">
              <div class="text">
                <p class="fz-18">{{ t('mullers.result_description') }}</p>
              </div>
            </div>
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