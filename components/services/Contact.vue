<template>
  <section class="call-action section-padding bord-thin-bottom">
    <div class="contact-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12">
            <div class="text-center">
              <div class="mb-30">
                <span class="sub-title bord">Work With Us</span>
              </div>
              <h2 class="fz-70 f-bold text-u">
                We would love <span class="d-block f-ultra-light">to hear more about</span> your project
              </h2>
              <a href="/contact" class="butn-circle animsition-link colorbg mt-30">
                <span>Get In Touch</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

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
