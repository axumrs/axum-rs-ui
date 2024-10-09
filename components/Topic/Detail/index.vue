<script setup lang="ts">
const props = defineProps<{
  topic: TopicWithSubjectAndTagsAndProtectedSections;
  subject: Subject;
}>();

const { $value: price } = use$decimal(props.subject.price);
const needBuy = computed(() =>
  price.value.isZero() ? false : props.topic.try_readable === false
);
</script>

<template>
  <TopicDetailHero :topic="topic" />
  <TopicDetailContentNeedBuy v-if="needBuy" class="my-6" :subject="subject" />
  <TopicDetailContent :topic="topic" v-else class="my-3" />
</template>
