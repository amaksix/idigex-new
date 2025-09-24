<template>
  <section class="call-action section-padding bord-thin-bottom">
    <div class="contact-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="text-center">
              <div class="mb-30">
                <span class="sub-title bord">{{ t('home.contact.sub_title') }}</span>
              </div>
              <h2 class="fz-70 f-bold text-u">
                {{ t('home.contact.heading_part1') }}
                <span class="d-block f-ultra-light">{{ t('home.contact.heading_part2') }}</span>
                {{ t('home.contact.heading_part3') }}
              </h2>
              <NuxtLink :to="localePath('/contact')" class="butn-circle animsition-link colorbg mt-30">
                <span>{{ t('home.contact.button') }}</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
 import { useI18n, useLocalePath } from '#i18n'

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
const handleResize = () => {
  if (window.innerWidth > 991) {
    gsap.set('.contact-container', { yPercent: -50 });
    const cover = gsap.timeline({ paused: true });
    cover.to('.contact-container', { yPercent: 0, ease: 'none' });

    ScrollTrigger.create({
      trigger: '.main-box',
      start: 'bottom bottom',
      end: '+=50%',
      animation: cover,
      scrub: true,
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
