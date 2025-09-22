<template>
  <section class="next-project section-padding sub-bg">
    <div class="contact-container">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="text-center">
              <h6 class="sub-title fz-18">{{ t('next_project') }}</h6>
              <div class="inline">
                <div class="d-flex align-items-center">
                  <NuxtLink  :to="localePath('/projects/ViaBon')" class="animsition-link fz-70 fw-700 stroke">VIABon</NuxtLink>
                  <span class="ml-15">
                    <img src="/assets/imgs/svg-assets/arrow-right-top.svg" alt="" class="icon-img-70" />
                  </span>
                </div>
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
