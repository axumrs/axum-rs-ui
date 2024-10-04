<script setup lang="ts">
const { slug: _slug } = useRoute().params;
const slug = computed(() => _slug.toString());

const { $get } = use$fetch();

const topicList = ref<TopicWithSubjectAndTags[]>([]);
const subject = ref<Subject>();

const loadData = async () => {
  await $get<SubjectDetailResp>(`/user/subject/detail/${slug.value}`, (v) => {
    if (v) {
      topicList.value = v.topic_list;
      subject.value = v.subject;
    }
  });
};
await loadData();
</script>

<template>
  <SubjectDetail v-if="subject" :subject="subject" :topicList="topicList" />
</template>
