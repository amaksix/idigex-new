<template>
  <section class="testimonials section-padding">
    <div class="container">
      <div class="sec-head pb-20 bord-thin-bottom mb-80">
        <div class="d-flex align-items-center">
          <div>
            <h3 class="f-bold text-u">Testimonials</h3>
          </div>
          <div class="ml-auto">
            <div class="swiper-button-prev">
              <span class="pe-7s-angle-left"></span>
            </div>
            <div class="swiper-button-next">
              <span class="pe-7s-angle-right"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-9">
          <div class="testim">
            <Swiper v-if="data.length" id="content-carousel-container-unq-testim" v-bind="swiperOptions">
              <template v-for="item in data" :key="item.id">
                <SwiperSlide>
                  <div class="item">
                    <div class="row">
                      <div class="col-md-2">
                        <div class="quote-icon icon-img-80 pt-10">
                          <img src="/assets/imgs/svg-assets/quote.png" alt="" />
                        </div>
                      </div>
                      <div class="col-md-10">
                        <div class="cont">
                          <h4 class="fz-24">{{ item.quote }}</h4>
                          <div class="info mt-30">
                            <h5 class="text-u ls1">{{ item.author }}</h5>
                            <span class="sub-title opacity-8 mt-5">{{ item.client }}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </template>
            </Swiper>
          </div>
        </div>
        <div class="col-lg-3 d-flex align-items-center justify-content-center">
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination } from 'swiper';
//= Common Scripts
import removeSlashFromPagination from '@/common/removeSlashFromPagination';
//= Static Data
import data from '@/data/About/testimonials.json';

const swiperOptions = {
  modules: [Navigation, Pagination],
  slidesPerView: 1,
  loop: true,
  spaceBetween: 30,
  navigation: {
    nextEl: '.testimonials .swiper-button-next',
    prevEl: '.testimonials .swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
};

onMounted(() => {
  removeSlashFromPagination();
});
</script>
