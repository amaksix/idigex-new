<template>
  <header class="about-header section-padding pb-0">
    <div class="container mt-0">
      <div class="row">
        <div class="col-lg-9 offset-lg-1">
          <div class="cont">
            <h6 class="sub-title mb-15">{{ subtitle }}</h6>
            <h1 class="text-u">{{ title }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="img mt-80" data-overlay-dark="4">
      <img :src="image" alt="" />
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "Services" },
  image: { type: String, default: "/assets/imgs/b3.jpg" }
})
</script>