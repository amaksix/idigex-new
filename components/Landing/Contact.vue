<template>
  <section class="contact section-padding">
    <div class="contact-container">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <div class="sec-head mb-80">
              <span class="sub-title mb-15 opacity-8">- Contact Us</span>
              <h3 class="text-u f-bold fz-50">Get In <span class="f-ultra-light">Touch</span>.</h3>
            </div>
            <div class="full-width">
              <form id="contact-form" method="post" action="contact.php">
                <div class="messages"></div>
                <div class="controls row">
                  <div class="col-lg-6">
                    <div class="form-group mb-30">
                      <input id="form_name" type="text" name="name" placeholder="Name" required />
                    </div>
                  </div>
                  <div class="col-lg-6">
                    <div class="form-group mb-30">
                      <input id="form_email" type="email" name="email" placeholder="Email" required />
                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group">
                      <textarea id="form_message" name="message" placeholder="Message" rows="4" required></textarea>
                    </div>
                    <div class="mt-30 hover-this cursor-pointer">
                      <button type="submit" class="hover-anim">
                        <span class="text">Let's Talk</span>
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive } from 'vue';
// You need to import gsap, ScrollTrigger, and other libraries here.

// State for gsap animation
const state = reactive({
  gsapAnimation: null,
});

// Handle the resize and animation setup on mount
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
});

// Function to handle resize and animation setup
function handleResize() {
  if (window.innerWidth > 991) {
    gsap.set('.contact-container', { yPercent: -50 });
    state.gsapAnimation = gsap.timeline({ paused: true });
    state.gsapAnimation.to('.contact-container', { yPercent: 0, ease: 'none' });

    ScrollTrigger.create({
      trigger: '.main-box',
      start: 'bottom bottom',
      end: '+=50%',
      animation: state.gsapAnimation,
      scrub: true,
    });
  }
}
</script>
