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
                  <a href=" https://pin.it/3JJQ5bqAX" target="_blank" rel="noopener noreferrer"><span class="hover-anim">Pinterest</span></a>
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
                  <div @click="cookie = true" class="menu-icon cursor-pointer">Sīkfailu iestatījumi</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div  v-if="cookie" class="cookie-banner">
   <div class="close-icon-container cursor-pointer" @click="cookie = false">
                <span class="close-icon">
                  <i></i>
                  <i></i>
                </span>
              </div>
        <p class="fw-400 fz-14">Mēs izmantojam sīkdatnes tikai, lai nodrošinātu mūsu vietnes pareizu darbību. Nav izsekošanas, analītikas vai mārketinga.</p>
    <div class="col-lg-8 d-flex align-items-center justify-end" style="color:#141414;">
            <a @click="acceptCookie" class="cursor-pointer" >
              <div class="more mt-15 animsition-link cookie-button">
                <span>PIEKRĪT SĪKDATNĒM <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z"
                      fill="currentColor"></path>
                  </svg></span>
              </div>
            </a>
          </div>
    </div>
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
const cookie = ref(false);
function checkcookie() {
  try {
    if (!localStorage.getItem('cookieConsent')) {
      cookie.value = true;
    }
  } catch (e) {
    console.error('localStorage error:', e);
    // fallback: show banner
    cookie.value = true;
  }
};
 checkcookie();

const acceptCookie = () => {
    try {
      localStorage.setItem('cookieConsent', 'true');
    } catch (e) {
      console.error('localStorage set error:', e);
    }
   cookie.value = false;
 };
</script>
