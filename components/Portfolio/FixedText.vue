<template>
  <section class="inter-fixed-text section-padding pt-40 o-hidden">
    <div class="container-xxl">
      <div class="links-img">
        <div class="row">
          <div v-for="item in data" :key="item.id" :class="`col-lg-${item.col} items`">
            <div v-if="item.col < 12" class="item">
              <div :data-tab="`tab-${item.id}`" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" class="img">
                <img :src="item.image" alt="" />
                <a :href="item.link" class="animsition-link link-overlay"></a>
              </div>
            </div>
            <div v-else class="row justify-content-center">
              <div class="col-lg-8">
                <div class="item">
                  <div :data-tab="`tab-${item.id}`" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
                    class="img">
                    <img :src="item.image" alt="" />
                    <a :href="item.link" class="animsition-link link-overlay"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="links-text">
      <ul class="rest">
        <li v-for="item in data" :key="item.id" :id="`tab-${item.id}`">
          <span class="tag">{{ item.tag }}</span>
          <h2>{{ item.title }}</h2>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import data from '@/data/Portfolio/fixed-text.json';

const handleMouseEnter = (event) => {
  const tab_id = event.currentTarget.dataset.tab;

  document.querySelectorAll('.links-img li').forEach(el => el.classList.remove('current'));
  event.currentTarget.classList.add('current');

  document.querySelectorAll('.links-text li').forEach(el => el.classList.remove('current'));
  document.querySelector("#" + tab_id).classList.add('current');

  if (event.currentTarget.classList.contains('current')) return false;
};

const handleMouseLeave = () => {
  document.querySelectorAll('.links-img .img').forEach(el => el.classList.remove('current'));
  document.querySelectorAll('.links-text li').forEach(el => el.classList.remove('current'));
};
</script>
