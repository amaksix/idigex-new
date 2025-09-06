<template>
  <section class="team section-padding bord-thin-bottom">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <div class="sec-head mb-80">
            <span class="sub-title bord mb-30">Team</span>
            <h3 class="text-u text-indent ls1">We help to create strategies &amp; Design.</h3>
          </div>
        </div>
      </div>
      <div class="row md-marg">
        <div v-for="(item, index) in data" :key="item.id" class="col-lg-4">
          <div :class="`item ${index !== data.length - 1 ? 'md-mb50' : ''}`">
            <div class="img">
              <img :src="item.image" alt="" />
            </div>
            <div class="info mt-20">
              <span class="fz-12 opacity-8">{{ item.role }}</span>
              <h6 class="fz-18">{{ item.name }}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/CreativeAgency/team.json';
</script>
