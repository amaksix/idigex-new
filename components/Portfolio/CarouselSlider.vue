<template>
  <header class="carousel-slider valign">
    <div class="full-width">
      <div class="gallery-img">
        <Swiper v-bind="swiperGalleryImageOptions" class="swiper-container">
          <SwiperSlide v-for="item in data" :key="item.id">
            <div class="swiper-slide">
              <div class="bg-img" :data-background="item.background" data-overlay-dark="3">
                <a :href="item.link" class="animsition-link"></a>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="gallery-text">
        <Swiper v-bind="swiperGalleryTextOptions"
          class="swiper-container swiper-container-initialized swiper-container-vertical">
          <SwiperSlide v-for="item in data" :key="item.id">
            <div class="text">
              <h4>{{ item.text.title }}</h4>
              <h6><span>{{ item.text.subtitle }}</span></h6>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
    <div class="swiper-controls">
      <div class="swiper-button-next swiper-nav-ctrl cursor-pointer">
        <div>
          <span>Next Slide</span>
        </div>
        <div><i class="fas fa-chevron-right"></i></div>
      </div>
      <div class="swiper-button-prev swiper-nav-ctrl cursor-pointer">
        <div><i class="fas fa-chevron-left"></i></div>
        <div>
          <span>Prev Slide</span>
        </div>
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </header>
</template>

<script setup>
import { onMounted, watch, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Autoplay, Keyboard, Mousewheel, Pagination } from 'swiper';
//= Scripts
import loadBackgroudImages from '@/common/loadBackgroudImages';
//= Static Data
import data from '@/data/Portfolio/carousel-slider.json';

const galleryImg = ref(null);
const galleryText = ref(null);

const swiperGalleryImageOptions = {
  modules: [Navigation, Autoplay, Keyboard, Mousewheel, Pagination],
  onSwiper(swiper) {
    galleryImg.value = swiper;
  },
  spaceBetween: 80,
  slidesPerView: 2,
  centeredSlides: true,
  loop: true,
  loopedSlides: 4,
  mousewheel: true,
  speed: 1500,
  navigation: {
    nextEl: '.carousel-slider .swiper-controls .swiper-button-next',
    prevEl: '.carousel-slider .swiper-controls .swiper-button-prev',
  },
  pagination: {
    el: '.carousel-slider .swiper-pagination',
    clickable: true,
    renderBullet(_, className) {
      return '<span class="' + className + '">' + '<svg class="fp-arc-loader" width="16" height="16" viewBox="0 0 16 16">' +
        '<circle class="path" cx="8" cy="8" r="5.5" fill="none" transform="rotate(-90 8 8)" stroke="#FFF"' +
        'stroke-opacity="1" stroke-width="1px"></circle>' +
        '<circle cx="8" cy="8" r="3" fill="#FFF"></circle>' +
        '</svg></span>';
    },
  },
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 2,
    },
  }
};

const swiperGalleryTextOptions = {
  modules: [Mousewheel],
  onSwiper(swiper) {
    galleryText.value = swiper;
  },
  spaceBetween: 30,
  slidesPerView: 1,
  direction: 'vertical',
  loop: true,
  loopedSlides: 4,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  mousewheel: true,
  speed: 1500,
};

onMounted(() => {
  loadBackgroudImages();
});

watch([galleryImg, galleryText], () => {
  if (galleryImg.value && galleryText.value) {
    galleryImg.value.on("slideChangeTransitionStart", function () {
      galleryText.value.slideTo(galleryImg.value.activeIndex);
    });
    galleryText.value.on("transitionStart", function () {
      galleryImg.value.slideTo(galleryText.value.activeIndex);
    });
  }
});
</script>
