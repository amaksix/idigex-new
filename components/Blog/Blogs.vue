<template>
  <section class="blog-column section-padding pt-90">
    <div class="container">
      <div class="gallery">
        <div class="row">
          <div v-for="item in data" :key="item.id" class="items col-lg-4 col-md-6">
            <div class="item">
              <div class="img">
                <img :src="item.image" alt="" />
                <span class="date"><strong>{{ item.date.day }}</strong> {{ item.date.month }}</span>
              </div>
              <div class="cont">
                <span class="sub-title mb-15 opacity-8">{{ item.category }}</span>
                <h4>{{ item.title }}</h4>
                <a :href="item.link" class="animsition-link more mt-20">Read More</a>
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
import data from '@/data/Blog/blogs.json';

// Initialize Isotope when component is mounted
onMounted(() => {
  initIsotope();
});
</script>
