<script setup>
import { ref, watch, onMounted } from 'vue';
const { messages, locale } = useI18n(); 

const briefTitle = ref('');
const briefItems = ref([]); 

const processData = () => {
    const messagesByLocale = messages.value?.[locale.value];

    // Check for structure, though logging confirmed this is now reliable
    if (!messagesByLocale || !messagesByLocale.home?.brief) {
        briefTitle.value = '';
        briefItems.value = [];
        return; 
    }

    const briefData = messagesByLocale.home.brief;

    // --- CRITICAL FIX 1: Simplify the title path ---
    // The string is directly on `briefData.title`
    briefTitle.value = briefData.title || '';

    // --- CRITICAL FIX 2: Simplify the items path ---
    const items = briefData.items || [];
    
    if (!Array.isArray(items)) {
        briefItems.value = [];
        return;
    }
    
    briefItems.value = items.map((item) => ({
        // Based on the simplified title path, assume item properties are also strings
        // OR, if the items array contains deeply nested objects, you need to check the JSON.
        
        // Let's assume the CMS structure is only applied to the array's root elements (briefData.items),
        // but the item properties themselves are just strings in the array:
        
        // If your JSON looks like: items: [{ numb: '01', title: 'Strategy' }, ...]
        numb: item.numb || '',
        title: item.title || '',
        content: item.content || '',
        icon: item.icon || '',

        /* // IF the CMS structure is nested *inside* the items (e.g., item.title: { body: { static: ... } })
        // You MUST revert to the long path:
        numb: item.numb?.body?.static || '',
        title: item.title?.body?.static || '', 
        content: item.content?.body?.static || '',
        icon: item.icon?.body?.static || '',
        */
    }));
};

watch([messages, locale], processData, { immediate: true, deep: true }); 

onMounted(() => {
    processData();
});
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
