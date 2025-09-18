<script setup>
import { useI18n } from '#i18n'
import { computed } from 'vue'

const { t } = useI18n()

// Wrap both the title and the items in computed
const briefTitle = computed(() => t('home.brief.title'))
const briefItems = computed(() => {
  const items = t('home.brief.items', [], { returnObjects: true })
  console.log('briefItems:', items) // This will show you what the t function is returning
  return Array.isArray(items) ? items : []
})
</script>

<template>
  <section class="feat section-padding">
    <div class="container">
      <div class="sec-head pb-20 bord-thin-bottom mb-80">
        <div class="d-flex align-items-center">
          <div>
            <h3 class="f-bold text-u">{{ briefTitle }}</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div v-for="(item, index) in briefItems" :key="index" class="col-lg-3 col-md-6 items">
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
