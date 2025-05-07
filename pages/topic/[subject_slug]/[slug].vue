<script setup lang="ts">
const { subject_slug: _subject_slug, slug: _slug } = useRoute().params;
const subject_slug = computed(() => _subject_slug.toString());
const slug = computed(() => _slug.toString());

const { $get } = use$fetch();

const subjectTopicList = ref<TopicWithSubjectAndTags[]>([]);
const subject = ref<Subject>();
const detail = ref<TopicWithSubjectAndTagsAndProtectedSections>();
const promotion = ref<Promotion>();

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
  await $get<TopicWithSubjectAndTagsAndProtectedSections>(
    `/user/topic/detail/${subject_slug.value}/${slug.value}`,
    (v) => {
      if (v) {
        detail.value = v;
      }
    }
  );
};

const loadPromotion = async () => {
  await $get<Promotion>(`/user/promotion/take`, (v) => {
    if (v) {
      promotion.value = v;
    }
  });
};

await Promise.all([loadSubjectCategoies(), loadDetail(), loadPromotion()]);
</script>

<template>
  <div class="mb-6 lg:mb-3">
    <SubjectNav
      :topic-list="subjectTopicList"
      :subject="subject"
      v-if="subject"
    />
  </div>
  <TopicDetail
    :topic="detail"
    :subject="subject"
    :promotion="promotion"
    v-if="detail && subject && promotion"
  />
</template>
