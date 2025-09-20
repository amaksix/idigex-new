<template>
  <div class="error-page">
    <h1 v-if="error.statusCode === 404">404 - Page Not Found</h1>
    <h1 v-else>{{ error.statusCode }} - Something Went Wrong</h1>
    <p>{{ error.message }}</p>
    <nuxt-link to="/">Go back</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({ statusCode: 500, message: 'Oops!' }),
    },
  },
}
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}
</style>
