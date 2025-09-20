<template>
  <div id="navi" class="topnav blur" :class="{ 'bord-thin-bottom': borderBottom }">
    <div class="container">
      <div :class="`logo icon-img-${borderBottom ? '100' : '90'}`">
        <NuxtLink :to="localePath('/')">
          <img src="/assets/imgs/Logo_IDigex.svg" alt="" />
        </NuxtLink>
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
 import { useI18n, useLocalePath } from '#i18n'

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
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
    document.querySelector('.haprivacy').style.opacity = '0';
    return;
  }
document.querySelector('.hamenu').classList.toggle('open');
  document.querySelector('.topnav .menu-icon').classList.toggle('open');
  navDark.classList.toggle('navlit');

  if (document.querySelector('.topnav .menu-icon').classList.contains('open')) {
    document.querySelector('.hamenu').style.top = '0';
  } else {
    document.querySelector('.hamenu').style.top = '-100%';
    document.querySelector('.haprivacy').style.opacity = '0';
    document.querySelector('.haprivacy').style.top = '-150%';
  }
};
</script>
