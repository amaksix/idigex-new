<script setup>
import { useI18n } from '#i18n'
import { computed } from 'vue'

const { messages, locale } = useI18n();
const briefTitle = computed(() => messages?.value[locale.value].home?.brief?.title.body.static);
const briefItems = computed(() => {
  const currentMessages = messages.value[locale.value];
  const items = currentMessages?.home?.brief?.items || [];

  return items.map(item => ({
    numb: item.numb.body.static,
    // Extract the string value from the title object
    title: item.title.body.static,
    // Extract the string value from the content object
    content: item.content.body.static,
    icon: item.icon.body.static
  }));
});




</script>

<template>
  <section class="feat section-padding">
    <div class="container">
      <div class="sec-head pb-20 bord-thin-bottom mb-80">
        <div class="d-flex align-items-center">
          <div>
            <h3 class="f-bold text-u">{{ briefTitle }}</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="(item, index) in briefItems" :key="index" class="col-lg-3 col-md-6 items">
          <div class="item">
            <span class="numb">{{ item.numb }}</span>
            <div class="icon-img-50">
              <img :src="item.icon" alt="" />
            </div>
            <h6>{{ item.title }}</h6>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
