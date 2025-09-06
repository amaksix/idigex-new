<template>
  <section class="section-padding bord-thin-bottom">
    <div class="container">
      <div class="row">
        <div class="col-lg-5">
          <h2 class="mb-50">The <br /> Challenge</h2>
        </div>
        <div class="col-lg-7">
          <div class="text">
            <h5 class="mb-30 fw-400 line-height-40">The goal is there are many variations of passages of Lorem Ipsum
              available, but the majority have suffered alteration in some form, by injected humour, or randomised words
              which don't look even slightly believable.</h5>
            <p class="fz-18">There are many variations of passages of Lorem Ipsum available, but the majority have
              suffered alteration in some form, by injected humour, or randomised words which don't look even slightly
              believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything
              embarrassing hidden in the middle of text.</p>
          </div>
          <div class="accordion bord mt-100">
            <div v-for="(item, index) in accordionData" :key="index" class="item mb-20 wow fadeInUp"
              :data-wow-delay="item.delay" @click="openAccordion">
              <div class="title">
                <h4 class="fw-300">{{ item.title }}</h4>
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
import { ref, onMounted } from 'vue';

const accordionData = ref([
  {
    title: 'The Power of Influencer Marketing',
    content: 'Taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.',
    delay: '.1s'
  },
  {
    title: 'Unique and Influential Design',
    content: 'Taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.',
    delay: '.3s'
  },
  {
    title: 'We Build and Activate Brands',
    content: 'Taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.',
    delay: '.5s'
  },
  {
    title: 'Unique and Influential Design',
    content: 'Taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole.',
    delay: '.7s'
  }
]);

function openAccordion(event) {
  document.querySelectorAll('.accordion .item').forEach(el => {
    el.classList.remove('active');
    el.querySelector('.accordion-info').style.display = 'none';
  });
  event.currentTarget.classList.add('active');
  event.currentTarget.querySelector('.accordion-info').style.display = 'block';
}
</script>
