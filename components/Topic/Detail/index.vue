<script setup lang="ts">
const props = defineProps<{
  topic: TopicWithSubjectAndTagsAndProtectedSections;
  subject: Subject;
  promotion: Promotion;
}>();
const { seoTitle } = use$seo();

onMounted(() => {
  seoTitle(`${props.topic.title} - ${props.subject.name}`);
});
</script>

<template>
  <TopicDetailHero :topic="topic" />
  <TopicDetailContentNeedBuy
    v-if="topic.need_buy === true"
    class="my-6"
    :subject="subject"
  />
  <TopicDetailContent
    :topic="topic"
    :promotion="promotion"
    class="my-3"
    v-else
  />
</template>
