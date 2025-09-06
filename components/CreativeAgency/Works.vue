<template>
  <section class="work section-padding bg-gray text-dark">
    <div class="marquee-head">
      <div class="container-fluid rest">
        <div class="row">
          <div class="col-12">
            <div class="main-marq">
              <div class="slide-har st1">
                <div class="box non-strok">
                  <div v-for="(_, i) in new Array(5).fill()" :key="i" class="item">
                    <h2>Selected Projects</h2>
                  </div>
                </div>
                <div class="box non-strok">
                  <div v-for="(_, i) in new Array(5).fill()" :key="i" class="item">
                    <h2>Selected Projects</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row gallery-img">
        <div v-for="item in data" :key="item.id"
          :class="`col-lg-${item.col} ${item.valign ? 'valign' : ''} ${item.offset ? 'offset-lg-2' : ''}`">
          <div class="item">
            <div class="img">
              <img :src="item.image" alt="" />
            </div>
            <div class="info d-flex align-items-center mt-20">
              <div>
                <h5 class="fz-20">{{ item.title }}</h5>
              </div>
              <div class="ml-auto">
                <span class="text-u fz-13">{{ item.category }}</span>
              </div>
            </div>
            <a :href="item.link" class="link-overlay animsition-link"></a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/CreativeAgency/works.json';
</script>
