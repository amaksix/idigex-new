<template>
  <section class="portfolio-classic portfolio pt-50 pb-40 bord-thin-bottom">
    <div class="container-fluid">
      <div class="gallery">
        <div class="row lg-marg">
          <div v-for="(item, index) in data" :key="item.id"
            :class="`items col-${index > 1 && (index + 1) % 3 === 0 ? '12' : 'md-6'}`">
            <div class="item mb-80">
              <div class="img">
                <img :src="item.image" alt="" />
                <a :href="item.link" class="animsition-link link-overlay"></a>
              </div>
              <div class="info mt-30">
                <span class="mb-5">{{ item.category }}</span>
                <h5>{{ item.title }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
//= Common Scripts
import initIsotope from '@/common/initIsotope';
//= Static Data
import data from '@/data/Portfolio/portfolio.json';

onMounted(() => {
  initIsotope();
});
</script>