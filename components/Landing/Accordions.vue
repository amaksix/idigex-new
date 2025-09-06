<template>
  <section class="section-padding">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 d-flex align-items-center justify-content-center">
          <div class="exp valign text-center">
            <div class="full-width">
              <h2>12+</h2>
              <h6 class="sub-title">Years of Experience</h6>
            </div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="accordion bord full-width">
            <div class="sec-head mb-70">
              <span class="sub-title mb-15 opacity-8">- Services</span>
              <h3 class="text-u f-bold fz-50">What We <span class="f-ultra-light">Do</span> ?</h3>
            </div>
            <div v-for="(item, index) in data" :key="item.id"
              :class="`item ${index !== data.length - 1 ? 'mb-20' : ''} wow fadeInUp`"
              :data-wow-delay="`${(index * 0.2) + 0.1}s`" @click="openAccordion">
              <div class="title">
                <h4>{{ item.title }}</h4>
                <span class="ico"></span>
              </div>
              <div class="accordion-info">
                <p>{{ item.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
// Import the necessary modules and data
import data from '@/data/Landing/accordions.json';

// Function to open accordion
function openAccordion(event) {
  document.querySelectorAll('.accordion .item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.accordion-info').style.display = 'none';
  });
  event.currentTarget.classList.add('active');
  event.currentTarget.querySelector('.accordion-info').style.display = 'block';
}
</script>
