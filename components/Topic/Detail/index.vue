<script setup lang="ts">
const needBuy = ref(true);
</script>

<template>
  <TopicDetailHero />
  <TopicDetailContentNeedBuy v-if="needBuy" class="my-6" />
  <TopicDetailContent v-else class="my-3" />
</template>
