<template>
  <section class="demos section-padding pb-40 bord-thin-bottom mt-50">
    <div class="container-xxl">
      <div class="gallery">
        <div class="row lg-marg">
          <div v-for="item in data" :key="item.id" class="items col-lg-4 col-md-6">
            <div class="item">
              <div class="img">
                <img :src="item.image" alt="" />
                <a :href="item.link" target="_blank" class="link-overlay"></a>
              </div>
              <div class="info">
                <h6>
                  <a :href="item.link" target="_blank">{{ item.title }}</a>
                </h6>
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
//= Scripts
import initIsotope from '@/common/initIsotope';
//= Static Data
import data from '@/data/Preview/portfolio.json';

onMounted(() => {
  initIsotope();
});
</script>