<template>
  <section class="inter-links-center vertical d-flex align-items-end section-padding pb-80">
    <div class="container-xxl">
      <div class="row">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div class="links-text">
            <ul class="rest">
              <li v-for="item in data" :key="item.id" :data-tab="`tab-${item.id}`" @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave">
                <h2>
                  <span class="num">0{{ item.id }}.</span>
                  <a :href="item.link" class="animsition-link">
                    <span class="text f-bold">{{ item.text }}</span>
                  </a>
                </h2>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="links-img">
      <div v-for="item in data" :key="item.id" :id="`tab-${item.id}`" class="img" data-overlay-dark="3">
        <img :src="item.image" alt="" />
      </div>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/Portfolio/interactive-vertical.json';

const handleMouseEnter = (event) => {
  const tab_id = event.currentTarget.dataset.tab;

  document.querySelectorAll('.links-text li').forEach((el) => {
    el.classList.remove('current');
    el.classList.remove('no-active');
  });
  event.currentTarget.classList.add('current');
  event.currentTarget.classList.remove('no-active');

  document.querySelectorAll('.links-img .img').forEach((el) => el.classList.remove('current'));
  document.querySelector("#" + tab_id).classList.add('current');

  if (event.currentTarget.classList.contains('current')) return false;
};

const handleMouseLeave = () => {
  document.querySelectorAll('.links-text li').forEach((el) => {
    el.classList.remove('current');
    el.classList.remove('no-active');
  });
  document.querySelectorAll('.links-img .img').forEach((el) => el.classList.remove('current'));
};
</script>
