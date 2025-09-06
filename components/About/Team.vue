<template>
  <section class="team section-padding pb-0">
    <div class="container">
      <div class="sec-head mb-80">
        <div class="row">
          <div class="col-lg-8">
            <h6 class="sub-title opacity-8 wow fadeInUp mb-15">- Our Team</h6>
            <h3 class="f-bold text-u d-rotate wow">
              <span class="rotate-text">Meet Our Team.</span>
            </h3>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid rest">
      <div class="row no-pad">
        <div v-for="item in data" :key="item.id" class="col-lg-3 col-md-6">
          <div class="item">
            <div class="img">
              <img :src="item.image" alt="" />
            </div>
            <div class="info mt-20">
              <span class="fz-12 opacity-8">{{ item.role }}</span>
              <h6 class="fz-18">{{ item.title }}</h6>
            </div>
          </div>
        </div>
        <div class="col-lg-3 col-md-6">
          <div class="item-join valign">
            <div class="full-width">
              <h5 class="text-u ls2 fw-500">Become Our <br /> Member</h5>
              <a href="/about" class="arrow mt-30">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z"
                    fill="currentColor"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/About/team.json';
</script>
