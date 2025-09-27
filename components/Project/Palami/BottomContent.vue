<script setup>
import { computed } from 'vue';

// 1. Declare all necessary functions/properties
const { t, messages, locale } = useI18n(); 
const localePath = useLocalePath();

// 2. Computed property to safely access and return the array
const solutionItems = computed(() => {
    // Safely navigate to the array in the messages object
    const items = messages.value?.[locale.value]?.palami?.solution_description;
    
    // Ensure it's an array before returning
    return Array.isArray(items) ? items : [];
});
</script>

<template>
  <section class="section-padding">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="row">
            <div class="col-lg-5">
              <h4 class="mb-50">02 . {{ t('palami.solution_title') }}</h4>
            </div>
            <div class="col-lg-7">
              <div class="text">
                <ul class="fz-18 list-unstyled">
                  <li v-for="(item, index) in solutionItems" :key="index" class="mb-1">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>