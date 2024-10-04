<script setup lang="ts">
defineProps<{
  hiddenSubject?: boolean;
  topicList: TopicWithSubjectAndTags[];
  itemWithBorder?: boolean;
  divide?: boolean;
}>();
</script>

<template>
  <ul class="flex flex-col list-decimal" :class="{ 'divide-y': divide }">
    <TopicListItem
      v-for="t in topicList"
      :key="t.id"
      :hidden-subject="hiddenSubject"
      :try-read="t.try_readable"
      :topic="t"
      :with-border="itemWithBorder"
    />
  </ul>
</template>
