<template>
  <section class="intro section-padding pb-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="sec-head">
            <h6 class="sub-title fz-20 md-mb50">FAQ</h6>
          </div>
        </div>
        <div class="col-12 col-lg-7 offset-lg-1">
          <div class="cont">
            <div class="accordion bord">
              <div v-for="(item, index) in faqItems" :key="item.id" class="item mb-20 wow fadeInUp" @click="openAccordion"
                :data-wow-delay="`${((index * 0.2) + 0.1).toFixed(1)}s`">
                <div class="title">
                  <h4 style="max-width: 85%;">{{ item.title }}</h4>
                  <span class="ico"></span>
                </div>
                <div class="accordion-info">
                  <p>{{ item.content }}</p>
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
import { ref, watch, onMounted } from 'vue';

// 1. Destructure all necessary reactivity primitives
const { messages, locale } = useI18n(); 
// We don't need 't' here since we are accessing the raw 'messages' object

// 2. Local ref to hold the processed, final data array
const faqItems = ref([]);

// 3. Define the main data processing function
const processData = () => {
    // CRITICAL: Safest guard against undefined messages/locale
    const messagesByLocale = messages.value?.[locale.value];

    if (!messagesByLocale || !messagesByLocale.home?.faq) {
        // Data not loaded yet for the current locale or path is wrong
        faqItems.value = [];
        return; 
    }

    // Safely access the FAQ items array (based on your debug: home.faq is the array)
    const items = messagesByLocale.home.faq || [];
    
    if (!Array.isArray(items)) {
        faqItems.value = [];
        return;
    }
    
    // Process the array, assuming the data structure confirmed by your logging
    faqItems.value = items.map(item => ({
        id: item.id,
        // Use the long CMS path with fallbacks, as originally suspected,
        // combined with a direct property access if the structure is flatter.
        // Based on the working debug, we should use the simplest working path:
        
        // Use the safest possible access:
        title: item.title?.body?.static || item.title || '',
        content: item.content?.body?.static || item.content || '',
    }));
};

// 4. CRITICAL: Watch for ANY change in messages or locale, and run immediately and deeply.
watch([messages, locale], processData, { immediate: true, deep: true }); 


// 5. Optional: Call once on mounted, just in case
onMounted(() => {
    processData();
});


// 6. Keep your non-i18n related functions outside the data processing logic
const openAccordion = (event) => {
    const currentItem = event.currentTarget;
    const isActive = currentItem.classList.contains('active');

    // close all first
    document.querySelectorAll('.accordion .item').forEach((el) => {
        el.classList.remove('active');
        // NOTE: This style manipulation is generally best done with Vue class bindings
        // to avoid manual DOM manipulation, but kept here for function.
        el.querySelector('.accordion-info').style.display = 'none';
    });

    // if the clicked one was NOT active, open it
    if (!isActive) {
        currentItem.classList.add('active');
        currentItem.querySelector('.accordion-info').style.display = 'block';
    }
};
</script>