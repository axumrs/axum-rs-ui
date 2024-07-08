<script setup lang="ts">
const { seoTitle, pageMeta } = use$seo();
seoTitle();
pageMeta();
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="useRoute().fullPath" />
  </NuxtLayout>
</template>
