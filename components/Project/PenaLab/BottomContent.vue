<template>
  <section class="section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-5">
              <h4 class="mb-50">02 . Risinājums</h4>
            </div>
            <div class="col-lg-7">
              <div class="text">
                <p class="fz-18">Mēs izstrādājām logotipu un zīmola grāmatu ar krāsu paleti, tipogrāfiju, ikonām un grafiskajiem elementiem. Papildus tika izveidota korporatīvā identitāte: vizītkartes, reklāmas plakāti, iepakojums, sociālo mediju materiālu veidnes. Vizuālā identitāte tika papildināta ar video un animācijas elementiem. Zīmola tiešsaistes identitātei tika izveidota mājaslapa platformā Webflow, kas atspoguļo tā radošo koncepciju.</p>
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