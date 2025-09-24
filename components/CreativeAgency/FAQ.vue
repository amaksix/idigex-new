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

import { computed } from 'vue';
import { useI18n, useLocalePath } from '#i18n';

const { messages, locale } = useI18n();

const faqItems = computed(() => {
  const currentMessages = messages.value[locale.value];
  const items = currentMessages?.home?.faq || [];

  return items.map(item => ({
    id: item.id,
    // Extract the string value from the title object
    title: item.title.body.static,
    // Extract the string value from the content object
    content: item.content.body.static
  }));
});
const openAccordion = (event) => {
  const currentItem = event.currentTarget;
  const isActive = currentItem.classList.contains('active');

  // close all first
  document.querySelectorAll('.accordion .item').forEach((el) => {
    el.classList.remove('active');
    el.querySelector('.accordion-info').style.display = 'none';
  });

  // if the clicked one was NOT active, open it
  if (!isActive) {
    currentItem.classList.add('active');
    currentItem.querySelector('.accordion-info').style.display = 'block';
  }
};
</script>
