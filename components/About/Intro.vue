<template>
  <section class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <div class="text">
            <span class="sub-title mb-15 opacity-8">- {{ t('about.intro.sub_title') }}</span>
            <div class="text-reval">
              <h2 class="fz-50 text-u mb-30">
                <span class="text">{{ t('about.intro.heading_part1') }}</span>
                <span class="text">{{ t('about.intro.heading_part2') }}</span>
              </h2>
            </div>
            <p>{{ t('about.intro.paragraph1') }}</p>
            <br />
            <p>{{ t('about.intro.paragraph2') }}</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="row mt-80">
            <div class="col-md-4 sm-mb30">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> {{ t('about.intro.feature1') }}</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> {{ t('about.intro.feature2') }}</li>                 
              </ul>
            </div>
            <div class="col-md-4 sm-mb30">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> {{ t('about.intro.feature3') }}</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> {{ t('about.intro.feature4') }}</li>
              </ul>
            </div>
            <div class="col-md-4">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> {{ t('about.intro.feature5') }}</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> {{ t('about.intro.feature6') }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import both the t() function via useI18n AND the localePath function via useLocalePath
  import { useI18n, useLocalePath } from '#i18n'

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
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
