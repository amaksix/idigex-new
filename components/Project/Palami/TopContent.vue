<template>
  <section class="section-padding">
    <div class="container">
      <div class="info mb-80 pb-20 bord-thin-bottom">
        <div class="row">
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ t('all_projects.category_label', 'Kategorija :') }}</span>
              <h6>{{ t('palami.category') }}</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ t('all_projects.client_label', 'Client :') }}</span>
              <h6>
                <a style="text-decoration: underline;text-underline-offset: 8px;" href="https://palami.com/" target="_blank" rel="noopener noreferrer">Palami</a>
              </h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item mb-30">
              <span class="opacity-8 mb-5">{{ t('all_projects.year_label', 'Gads:') }}</span>
              <h6>2024</h6>
            </div>
          </div>
          <div class="col-md-6 col-lg-3">
            <div class="item">
              <span class="opacity-8 mb-5">{{ t('all_projects.field_label', 'Darbības sfēra:') }}</span>
              <h6>{{ t('palami.field') }}</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-5">
              <h4 class="mb-50">01 . {{ t('palami.task_title') }}</h4>
            </div>
            <div class="col-lg-7">
              <div class="text">
                <h5 class="mb-30 fw-400 line-height-40">{{ t('palami.task_description') }}</h5>
                <h5 class="mb-30 fw-400 line-height-40">{{ t('palami.models_title') }}</h5>
                <p class="fz-18">{{ t('palami.models_description') }}</p>
                <br/>
                <h5 class="mb-30 fw-400 line-height-40">{{ t('palami.configurator_title') }}</h5>
                <p class="fz-18">{{ t('palami.configurator_description') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
  const { t } = useI18n()
  const localePath = useLocalePath()
</script>