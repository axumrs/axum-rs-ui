<script setup lang="ts">
const props = defineProps<{ title: string; icon?: string }>();
const { seoTitle } = use$seo();
seoTitle(props.title);
</script>

<template>
  <div class="flex justify-start items-center gap-x-2">
    <Icon :name="icon || 'teenyicons:rust-outline'" size="1.5rem" />
    <h1 class="text-xl font-semibold lg:text-2xl">{{ title }}</h1>
  </div>
</template>
