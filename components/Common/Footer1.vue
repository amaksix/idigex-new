<template>
  <footer :class="{ 'sub-bg': subBg }">
    <div class="footer-container">
      <div class="container pb-80 pt-80 ontop">
        <div class="row">
          <div class="col-lg-6">
            <div class="eml">
              <h6 class="sub-title opacity-8">
                mēs ar prieku uzklausīsim jūs.
              </h6>
              <h2 class="underline fz-60">
                <a href="#0">idigexlv@gmail.com</a>
              </h2>
            </div>
          </div>
        </div>
        <div class="row mt-80">
          <div class="col-lg-2">
            <div class="logo">
              <img src="/assets/imgs/Logo_IDigex.svg" alt="" />
            </div>
          </div>
          <div class="col-lg-6">
            <div class="column">
              <h6 class="sub-title mb-30">Sociālie tīkli</h6>
              <ul class="rest">
                <li class="hover-this cursor-pointer">
                  <a href="https://www.facebook.com/profile.php?id=61578923682378" target="_blank" rel="noopener noreferrer"><span class="hover-anim">Facebook</span></a>
                </li>
                <li class="hover-this cursor-pointer">
                  <a href="https://www.instagram.com/idigexlv/" target="_blank" rel="noopener noreferrer" ><span class="hover-anim">Instagram</span></a>
                </li>
                <li class="hover-this cursor-pointer">
                  <a href="#0"><span class="hover-anim">Pinterest</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="column">
              <h6 class="sub-title mb-30">Navigācija</h6>
                <ul class="rest">
                <li class="hover-this cursor-pointer">
                  <a href="/" ><span class="hover-anim">Sākums</span></a>
                </li>
                <li class="hover-this cursor-pointer ">
                  <a href="/about"><span class="hover-anim">Par mums</span></a>
                </li>
                <li class="hover-this cursor-pointer ">
                  <a href="/portfolio" ><span class="hover-anim">Projekti</span></a>
                </li>
                <li class="hover-this cursor-pointer ">
                  <a href="/contact" ><span class="hover-anim">Kontakti</span></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="container bord pt-30 pb-30 bord-thin-top">
        <div class="row">
          <div class="col-lg-6">
            <div class="links">
              <ul class="rest">
                <li>
                  <div @click="togglePrivacyPolicy" class="menu-icon cursor-pointer">Privātuma politika</div>
                </li>
                <li>
                  <div @click="togglePrivacyPolicy" class="menu-icon cursor-pointer">Sīkfailu iestatījumi</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

const { subBg } = defineProps({
  subBg: Boolean,
});

const handleResize = () => {
  if (window.innerWidth > 991) {
    gsap.set(".footer-container", { yPercent: -50 });
    const uncover = gsap.timeline({ paused: true });
    uncover.to(".footer-container", { yPercent: 0, ease: "none" });

    ScrollTrigger.create({
      trigger: "main",
      start: "bottom bottom",
      end: "+=50%",
      animation: uncover,
      scrub: true,
    });
  }
};

onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
const togglePrivacyPolicy = () => {
  const navDark = document.querySelector('.topnav');
const parent = document.querySelector('.haprivacy');


document.querySelector('.haprivacy').classList.toggle('open');
document.querySelector('.topnav .menu-icon').classList.toggle('open');
  navDark.classList.toggle('navlit');

  if (document.querySelector('.topnav .menu-icon ').classList.contains('open')) {
    document.querySelector('.haprivacy').style.top = '0';
  }else {
    document.querySelector('.hamenu').style.top = '-100%';
    document.querySelector('.haprivacy').style.top = '-100%';
  }
};
</script>
