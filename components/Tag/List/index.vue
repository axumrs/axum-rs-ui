<script setup lang="ts">
defineProps<{ tagList: TagWitTopicCount[] }>();
</script>

<template>
  <ul class="grid grid-cols-2 gap-3 lg:grid-cols-4 2xl:gap-6 2xl:grid-cols-5">
    <TagListItem v-for="t in tagList" :key="t.id" :tag="t" />
  </ul>
</template>
