<template>
  <section class="section-padding pb-0">
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <div class="text">
            <span class="sub-title mb-15 opacity-8">- {{ about.sectionTitle }}</span>
            <div class="text-reval">
              <h2 class="fz-50 text-u mb-30">
                <span v-for="(line, i) in about.headline" :key="i" class="text">{{ line }}</span>
              </h2>
            </div>
            <p>{{ about.paragraph }}</p>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="row mt-80">
            <div class="col-md-10 sm-mb30" v-for="(list, i) in about.lists" :key="i">
              <ul class="list rest">
                <li v-for="(item, j) in list" :key="j" class="fz-18 mb-15">
                  <span class="mr-10">+</span>{{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>
<script setup>
defineProps({
  about: {
    type: Object,
    default: () => ({
      sectionTitle: '',
      headline: [],
      paragraph: '',
      lists: []
    })
  }
})

import { onMounted, onUnmounted } from 'vue';

const handleResize = () => {
  if (window.innerWidth > 991) {
    gsap.to(".text-reval .text", {
      backgroundPositionX: "0%",
      stagger: 1,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".text-reval",
        markers: false,
        scrub: 1,
        start: "top center",
        end: "bottom center"
      }
    });
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
