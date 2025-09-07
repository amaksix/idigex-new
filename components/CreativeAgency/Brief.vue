<template>
  <section class="feat section-padding">
    <div class="container">
      <div class="sec-head pb-20 bord-thin-bottom mb-80">
        <div class="d-flex align-items-center">
          <div>
            <h3 class="f-bold text-u">Process / How we work</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="item in data" :key="item.id" class="col-lg-3 col-md-6 items">
          <div class="item">
            <span class="numb">{{ item.numb }}</span>
            <div class="icon-img-50">
              <img :src="item.icon" alt="" />
            </div>
            <h6>{{ item.title }}</h6>
            <p>{{ item.content }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/CreativeAgency/brief.json';
</script>
