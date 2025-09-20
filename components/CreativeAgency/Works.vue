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
                    <h2>{{ t('home.projects.marquee_title') }}</h2>
                  </div>
                </div>
                <div class="box non-strok">
                  <div v-for="(_, i) in new Array(5).fill()" :key="i" class="item">
                    <h2>{{ t('home.projects.marquee_title') }}</h2>
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
        <div
          v-for="item in data"
          :key="item.id"
          :class="`col-lg-${item.col} ${item.valign ? 'valign' : ''} ${item.offset ? 'offset-lg-2' : ''}`"
        >
          <div class="item">
            <div class="img">
              <img :src="item.image" alt="" />
            </div>
            <div class="info d-flex align-items-center mt-20">
              <div>
                <h5 class="fz-20">{{ item.title }}</h5>
              </div>
              <div class="ml-auto">
                <span class="text-u fz-13">
                  {{ item.categoryKeys.map(key => t(`home.projects.categories.${key}`)).join(', ') }}
                </span>
              </div>
            </div>
            <NuxtLink :to="localePath(item.link)" class="link-overlay animsition-link"></NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-100">
      <div class="d-flex justify-content-center align-items-center">
        <span class="sub-title ls1 bord">{{ t('home.projects.all_projects') }}</span>
        <NuxtLink :to="localePath('/portfolio')" class="arrow ml-2">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M13.922 4.5V11.8125C13.922 11.9244 13.8776 12.0317 13.7985 12.1108C13.7193 12.1899 13.612 12.2344 13.5002 12.2344C13.3883 12.2344 13.281 12.1899 13.2018 12.1108C13.1227 12.0317 13.0783 11.9244 13.0783 11.8125V5.51953L4.79547 13.7953C4.71715 13.8736 4.61092 13.9176 4.50015 13.9176C4.38939 13.9176 4.28316 13.8736 4.20484 13.7953C4.12652 13.717 4.08252 13.6108 4.08252 13.5C4.08252 13.3892 4.12652 13.283 4.20484 13.2047L12.4806 4.92188H6.18765C6.07577 4.92188 5.96846 4.87743 5.88934 4.79831C5.81023 4.71919 5.76578 4.61189 5.76578 4.5C5.76578 4.38811 5.81023 4.28081 5.88934 4.20169C5.96846 4.12257 6.07577 4.07813 6.18765 4.07812H13.5002C13.612 4.07813 13.7193 4.12257 13.7985 4.20169C13.8776 4.28081 13.922 4.38811 13.922 4.5Z"
              fill="currentColor"
            ></path>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useI18n, useLocalePath } from '#i18n'

  // Declare the functions so they are available in the template
  const { t } = useI18n()
  const localePath = useLocalePath()
import data from '@/data/CreativeAgency/works.json';
import charming from '/assets/js/charming.min.js';
import HoverImgFx3 from '@/common/hoverEffect3';
</script>
