<template>
  <section class="interactive-center">
    <div class="container text-center">
      <div v-for="item in data" :key="item.id" class="item block" data-fx="1">
        <a :href="item.link" class="block__link animsition-link" :data-img="item.image">
          <div class="cont">
            <h4 class="f-bold">{{ item.title }}</h4>
            <p>{{ item.category }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
//= Common Scripts
import HoverImgFx1 from '@/common/hoverEffect1';
//= Static Data
import data from '@/data/Portfolio/interactive-center.json';

onMounted(() => {
  [...document.querySelectorAll('[data-fx="1"] > a, a[data-fx="1"]')].forEach(link => new HoverImgFx1(link));
});
</script>
