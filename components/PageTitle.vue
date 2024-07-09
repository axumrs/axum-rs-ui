<script setup lang="ts">
const props = defineProps<{ title: string }>();
const { seoTitle } = use$seo();
seoTitle(props.title);
</script>

<template>
  <h1 class="text-lg font-semibold lg:text-xl">{{ title }}</h1>
</template>
