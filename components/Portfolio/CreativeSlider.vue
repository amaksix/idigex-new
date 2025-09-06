<template>
  <header class="half-slider">
    <div class="gallery-img">
      <Swiper v-bind="swiperGalleryImageOptions" class="swiper-container">
        <SwiperSlide v-for="item in data" :key="item.id">
          <div class="bg-img" :data-background="item.background" data-overlay-dark="3">
            <a :href="item.link" class="animsition-link"></a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="gallery-text">
      <Swiper v-bind="swiperGalleryTextOptions" class="swiper-container">
        <SwiperSlide v-for="item in data" :key="item.id">
          <div class="text">
            <h6><span class="f-bold">{{ item.text.subtitle }}</span></h6>
            <h4>{{ item.text.title }}</h4>
          </div>
        </SwiperSlide>
      </Swiper>
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
import { ref, onMounted, watch } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Keyboard, Mousewheel, Pagination, Thumbs } from 'swiper';
//= Scripts
import loadBackgroudImages from '@/common/loadBackgroudImages';
//= Static Data
import data from '@/data/Portfolio/creative-slider.json';

const galleryImg = ref(null);
const galleryText = ref(null);

const swiperGalleryTextOptions = {
  modules: [Mousewheel, Thumbs],
  onSwiper(swiper) {
    galleryText.value = swiper;
  },
  spaceBetween: 100,
  centeredSlides: true,
  slidesPerView: 2,
  touchRatio: 0.2,
  slideToClickedSlide: true,
  loopedSlides: 4,
  mousewheel: true,
  speed: 1500,
  breakpoints: {
    0: {
      spaceBetween: 10,
      slidesPerView: 1,
      centeredSlides: false,
    },
    640: {
      spaceBetween: 30,
      slidesPerView: 1,
      centeredSlides: false,
    },
    768: {
      spaceBetween: 50,
      slidesPerView: 1,
      centeredSlides: false,
    },
    1024: {
      spaceBetween: 100,
      slidesPerView: 2,
      centeredSlides: true,
    },
  }
};

const swiperGalleryImageOptions = {
  modules: [Navigation, Keyboard, Mousewheel, Pagination, Thumbs],
  onSwiper(swiper) {
    galleryImg.value = swiper;
  },
  spaceBetween: 0,
  centeredSlides: true,
  loopedSlides: 4,
  mousewheel: true,
  speed: 1500,
  navigation: {
    nextEl: '.half-slider .swiper-controls .swiper-button-next',
    prevEl: '.half-slider .swiper-controls .swiper-button-prev',
  },
  pagination: {
    el: '.half-slider .swiper-pagination',
    clickable: true,
    renderBullet: function (_, className) {
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
  thumbs: {
    swiper: galleryText.value
  }
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
