<template>
  <section class="portfolio-grid portfolio pt-50">
    <div class="container pb-40 bord-thin-bottom">
      <div class="gallery">
        <div class="row lg-marg">
          <div v-for="(item, index) in data" :key="item.id"
            :class="`items col-lg-4 col-md-6 ${index === 1 ? 'mt-80' : ''}`">
            <div class="item mb-80">
              <div class="img">
                <img :src="item.image" alt="" />
                <div class="info-over">
                  <h5>{{ item.title }}</h5>
                  <span>{{ item.category }}</span>
                </div>
                <a :href="item.link" class="animsition-link link-overlay"></a>
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
import data from '@/data/Portfolio/grid.json';

onMounted(() => {
  initIsotope();
});
</script>
