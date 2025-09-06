<template>
  <div class="vid-sec sub-bg pb-70">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-11">
          <div class="vid-intro">
            <div class="video-container">
              <video autoplay loop muted>
                <source src="/assets/vid/vid-startup.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="brands mt-70">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-11">
            <div class="brand-items">
              <div class="row">
                <div class="col-lg-3 col-md-4 col-6 item" v-for="item in data" :key="item">
                  <div class="img">
                    <img :src="item" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
//= Static Data
import data from '@/data/About/brands.json';
</script>
