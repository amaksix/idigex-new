<template>
  <div id="navi" class="topnav blur" :class="{ 'bord-thin-bottom': borderBottom }">
    <div class="container">
      <div :class="`logo icon-img-${borderBottom ? '100' : '90'}`">
        <nuxt-link to="/">
          <img src="/assets/imgs/Logo_IDigex.svg" alt="" />
        </nuxt-link>
      </div>
      <div class="menu-icon cursor-pointer" @click="toggleMenu">
        <span class="text"><span class="word">Menu</span></span>
        <span class="icon">
          <i></i>
          <i></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

const { borderBottom } = defineProps(['borderBottom']);

const handleScroll = () => {
  const menu = document.querySelector('.topnav');
  if (window.scrollY > 100) {
    menu.classList.add('nav-scroll');
  } else {
    menu.classList.remove('nav-scroll');
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

const toggleMenu = () => {
  const navDark = document.querySelector('.topnav');
// Toggle only within this parent
 const haprivacy = document.querySelector('.haprivacy');


  // prevent toggling hamenu if haprivacy is already open
  if (haprivacy.classList.contains('open')) {
    document.querySelector('.topnav .menu-icon').classList.toggle('open');
    document.querySelector('.haprivacy').classList.toggle('open');
    document.querySelector('.haprivacy').style.top = '-150%';
    return;
  }
document.querySelector('.hamenu').classList.toggle('open');
  document.querySelector('.topnav .menu-icon').classList.toggle('open');
  navDark.classList.toggle('navlit');

  if (document.querySelector('.topnav .menu-icon').classList.contains('open')) {
    document.querySelector('.hamenu').style.top = '0';
  } else {
    document.querySelector('.hamenu').style.top = '-150%';
    document.querySelector('.haprivacy').style.top = '-100%';
  }
};
</script>
