<template>
  <section class="marquee">
    <div class="container-fluid rest">
      <div class="row">
        <div class="col-12">
          <div class="main-marq">
            <div class="slide-har st1">
              <div class="box non-strok">
                <div v-for="item in data" :key="item.id" class="item">
                  <h4 class="d-flex align-items-center">
                    <span>{{ item.title }}</span>
                    <span class="ml-50 stroke icon">*</span>
                  </h4>
                </div>
              </div>
              <div class="box non-strok">
                <div v-for="item in data" :key="item.id" class="item">
                  <h4 class="d-flex align-items-center">
                    <span>{{ item.title }}</span>
                    <span class="ml-50 stroke icon">*</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Import the data from the JSON file
import data from '@/data/Landing/marquee.json';
</script>