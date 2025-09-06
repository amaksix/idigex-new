<template>
  <div class="clients-carso">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="swiper5">
            <Swiper id="content-carousel-container-unq-clients" class="swiper-container" v-bind="swiperOptions">
              <SwiperSlide v-for="item in data" :key="item.id">
                <div class="item">
                  <div class="img icon-img-100">
                    <a href="#0">
                      <img :src="item.img" alt="" />
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Import the necessary modules and data
import { Swiper, SwiperSlide } from 'swiper/vue';
import data from '@/data/Landing/brands.json';

const swiperOptions = {
  slidesPerView: 5,
  loop: true,
  spaceBetween: 40,
  breakpoints: {
    0: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5,
    },
  }
};
</script>
