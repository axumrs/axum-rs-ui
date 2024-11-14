<script setup lang="ts">
defineProps<{
  topic: TopicWithSubjectAndTagsAndProtectedSections;
  subject: Subject;
}>();
</script>

<template>
  <TopicDetailHero :topic="topic" />
  <TopicDetailContentNeedBuy
    v-if="topic.need_buy === true"
    class="my-6"
    :subject="subject"
  />
  <TopicDetailContent :topic="topic" class="my-3" v-else />
</template>
