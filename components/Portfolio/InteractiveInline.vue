<template>
  <section class="interactive-inline d-flex align-items-end">
    <div class="container">
      <div v-for="item in data" :key="item.id" class="item block" data-fx="1">
        <a :href="item.link" class="block__link animsition-link" :data-img="item.image"></a>
        <div class="cont">
          <span class="mb-10 text-u">{{ item.number }}<span class="ml-10 mr-10">/</span>{{ item.category }}</span>
          <h4 class="f-bold">{{ item.title }}</h4>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
//= Common Scripts
import HoverImgFx1 from '@/common/hoverEffect1';
//= Static Data
import data from '@/data/Portfolio/interactive-inline.json';

onMounted(() => {
  [...document.querySelectorAll('[data-fx="1"] > a, a[data-fx="1"]')].forEach(link => new HoverImgFx1(link));
});
</script>
