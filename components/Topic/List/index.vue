<script setup lang="ts">
defineProps<{ hiddenSubject?: boolean }>();
</script>

<template>
  <ul class="flex flex-col gap-y-3 list-decimal">
    <TopicListItem
      v-for="i in 30"
      :key="`topic-item-${i}`"
      :hidden-subject="hiddenSubject"
      :try-read="i % 3 === 1"
    />
  </ul>
</template>
