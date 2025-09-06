<template>
  <section class="marquee pt-50 pb-50 bord-thin-bottom bord-thin-top mt-80">
    <div class="container-fluid rest">
      <div class="main-marq xlg-pading">
        <div class="slide-har st1">
          <div class="box">
            <div v-for="item in data" :key="item.id" class="item">
              <h4 class="d-flex align-items-center f-bold">
                <span>{{ item.title }}</span>
                <span class="ml-50 stroke icon">*</span>
              </h4>
            </div>
          </div>
          <div class="box">
            <div v-for="item in data" :key="item.id" class="item">
              <h4 class="d-flex align-items-center f-bold">
                <span>{{ item.title }}</span>
                <span class="ml-50 stroke icon">*</span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/CreativePortfolio/marquee.json';
</script>
