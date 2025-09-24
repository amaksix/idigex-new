<template>
  <section class="section-padding">
    <div class="container">
      <div class="info mb-80 pb-20 bord-thin-bottom">
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ t('all_projects.category_label', 'Kategorija :') }}</span>
              <h6>{{ t('penalab.category') }}</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ t('all_projects.client_label', 'Client :') }}</span>
              <h6>Pena Lab</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ t('all_projects.year_label', 'Gads:') }}</span>
              <h6>2025</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item">
              <span class="opacity-8 mb-5">{{ t('all_projects.field_label', 'Darbības sfēra:') }}</span>
              <h6>{{ t('penalab.field') }}</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-5">
              <h4 class="mb-50">01 . {{ t('penalab.task_title') }}</h4>
            </div>
            <div class="col-lg-7">
              <div class="text">
                <h5 class="mb-30 fw-400 line-height-40">{{ t('penalab.task_description') }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</section></template>
<script setup>
// Import both the t() function via useI18n AND the localePath function via useLocalePath
  import { useI18n, useLocalePath } from '#i18n'

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
</script>
