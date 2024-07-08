<script setup lang="ts">
useSeoMeta({ title: "AXUM中文网 - 带你使用 axum 构建企业应用 - axum.rs" });
</script>

<template>
  <NuxtLayout>
    <NuxtPage :key="useRoute().fullPath" />
  </NuxtLayout>
</template>
