<template>
  <section class="blog">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="main-post section-padding">
            <!-- Blog Content -->
            <Content />
            <!-- Info Area -->
            <InfoArea />
            <!-- Author Area -->
            <AuthorArea />
            <!-- Next Prev -->
            <NextPrev />
          </div>
        </div>
      </div>
    </div>
    <!-- Comments Form -->
    <CommentsForm />
  </section>
</template>

<script setup>
//= Components
import Content from './Content.vue';
import InfoArea from './InfoArea.vue';
import AuthorArea from './AuthorArea.vue';
import NextPrev from './NextPrev.vue';
import CommentsForm from './CommentsForm.vue';
</script>
