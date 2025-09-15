<template>
  <section class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-10">
          <div class="text">
            <span class="sub-title mb-15 opacity-8">- Dizains un tehnoloģijas</span>
            <div class="text-reval">
              <h2 class="fz-50 text-u mb-30">
                <span class="text">IDigex apvieno dizainu un  </span>
                <span class="text">tehnoloģijas.</span>
              </h2>
            </div>
            <p>
              Mēs veidojam tīmekļa vietnes, zīmolu veidošanu, logotipus un reklāmas materiālus,
              kas palīdz uzņēmumiem izcelties un runāt vienā valodā ar savu auditoriju.
              Savā darbā mēs koncentrējamies uz skaidrību un funkcionalitāti, izvairoties no liekā. Katrs projekts tiek izstrādāts,
               ņemot vērā biznesa mērķus un tā tirgus specifiku.
               Mūsu mērķis ir radīt risinājumus, kas ne tikai izskatās moderni, bet arī sniedz rezultātus.
            </p>
            <br/>
            <p>Mūsu tīmekļa projektu unikālās iezīmes:</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="row mt-80">
            <div class="col-md-4 sm-mb30">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> SEO-friendly</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Adaptācija uz mobilajām ierīcēm</li>                 
              </ul>
            </div>
            <div class="col-md-4 sm-mb30">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Ērta un intuitīva navigācija</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Pārdošanas rīki</li>
               </ul>
            </div>
            <div class="col-md-4">
              <ul class="list rest">
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Neaizmirstams dizains</li>
                <li class="fz-18 mb-15"><span class="mr-10">+</span> Operatīvais atbalsts</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
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
