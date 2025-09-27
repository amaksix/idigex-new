<template>
  <section class="works thecontainer ontop sub-bg">
    <div v-for="item in works" :key="item.id" class="panel">
      <div class="item">
        <div class="img">
          <img :src="item.img" alt="" />
        </div>
        <div class="cont d-flex align-items-center">
          <div>
            <span>{{ item.category }}</span>
            <h5>{{ item.title }}</h5>
          </div>
          <div class="ml-auto">
            <h6>{{ item.year }}</h6>
          </div>
        </div>
        <NuxtLink :href="localePath(item.link)" class="link-overlay animsition-link"></NuxtLink>
      </div>
    </div>
  </section>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue';

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
// ✅ Define the prop for Works
defineProps({
  works: {
    type: Array,
    required: true
  }
})
const handleResize = () => {
  const allTriggers = ScrollTrigger.getAll();
  if ((window.innerWidth < 991 && allTriggers.length) || (window.innerWidth > 991 && !allTriggers.length)) {
    window.location.reload();
  }

  allTriggers.forEach((trigger) => {
    trigger.update();
  });
};

// Register the ScrollTrigger plugin and animate on component mount
onMounted(() => {
  if (window.innerWidth > 991) {
    let sections = gsap.utils.toArray(".panel");
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(sections, {
      xPercent: -65 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: ".thecontainer",
        pin: true,
        scrub:1,
        end: () => "+=" + window.innerWidth * (sections.length - 1)* 0.4  // ✅ dynamic end
      }
    });
  }
  window.addEventListener('resize', handleResize);
});

// Remove the resize event listener on component unmount
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});
</script>
