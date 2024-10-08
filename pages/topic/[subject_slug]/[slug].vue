<script setup lang="ts">
const { subject_slug: _subject_slug, slug: _slug } = useRoute().params;
const subject_slug = computed(() => _subject_slug.toString());
const slug = computed(() => _slug.toString());

const { $get } = use$fetch();

const subjectTopicList = ref<TopicWithSubjectAndTags[]>([]);
const subject = ref<Subject>();
const detail = ref<TopicWithSubjectAndTagsAndSections>();

const loadSubjectCategoies = async () => {
  await $get<SubjectDetailResp>(
    `/user/subject/detail/${subject_slug.value}`,
    (v) => {
      subjectTopicList.value = v?.topic_list || [];
      subject.value = v?.subject || undefined;
    }
  );
};

const loadDetail = async () => {
  await $get<TopicWithSubjectAndTagsAndSections>(
    `/user/topic/detail/${subject_slug.value}/${slug.value}`,
    (v) => {
      if (v) {
        detail.value = v;
      }
    }
  );
};

await Promise.all([loadSubjectCategoies(), loadDetail()]);
</script>

<template>
  <div class="mb-6 lg:mb-3">
    <SubjectNav
      :topic-list="subjectTopicList"
      :subject="subject"
      v-if="subject"
    />
  </div>
  <TopicDetail :topic="detail" :subject="subject" v-if="detail && subject" />
</template>
