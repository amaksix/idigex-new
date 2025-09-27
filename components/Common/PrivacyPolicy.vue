<template>
  <div class="haprivacy valign">
    <div class="container">
      <div class="row ">
        <div class="col-lg-12 ">
          <div style="height:80vh; padding-top:5vh; padding-bottom:5vh;" class="menu-links privacy-container">
            <h2 class="main-title mb-50">{{ t('privacy_policy.title') }}</h2> 
            <ul class="main-menu rest">
              <li v-for="index in 10" :key="index">
                <div class="o-hidden">
                  <h6 class="text-u fw-600 mb-10">{{ t(`privacy_policy.items.${index - 1}.heading`) }}</h6>
                  
                  <p class="fw-400 fz-18">
                    <span v-if="index === 10">
                      {{ t('privacy_policy.items.9.body') }}: 
                      <a href="mailto:idigexlv@gmail.com">idigexlv@gmail.com</a>
                    </span>
                    <span v-else>
                      {{ t(`privacy_policy.items.${index - 1}.body`) }}
                    </span>
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from '#imports';
const { t } = useI18n(); // Ensure t is imported if not using auto-import

const closeMenu = () => {
  document.querySelector('.haprivacy').classList.remove("open");
};
</script>