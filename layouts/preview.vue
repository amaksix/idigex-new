<template>
  <CommonCursor />
  <CommonProgressScroll />
  <slot />
</template>

<script setup>
useHead({
  link: [{ rel: "stylesheet", href: "/landing-preview/css/preview-style.css" }],
});
</script>
