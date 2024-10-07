<script setup lang="ts">
const { $get } = use$fetch();
const { $isLoading } = use$status();

const topSubjectList = ref<Subject[]>([]);
const topTopicList = ref<TopicWithSubjectAndTags[]>([]);
const loadTopSubjectList = async () => {
  $get<Subject[]>(
    "/user/subject/top",
    (v) => {
      if (v) {
        topSubjectList.value = v;
      }
    },
    { noLoading: true }
  );
};

const loadTopTopicList = async () => {
  $get<TopicWithSubjectAndTags[]>("/user/topic/top", (v) => {
    if (v) {
      topTopicList.value = v;
    }
  });
};

const loadData = () => {
  $isLoading.value = true;
  Promise.all([loadTopSubjectList(), loadTopTopicList()])
    .then()
    .finally(() => {
      $isLoading.value = false;
    });
};

loadData();
</script>

<template>
  <HomeBox title="推荐专题" href="/subject" more-text="全部专题">
    <SubjectTop
      v-if="topSubjectList && topSubjectList.length > 0"
      :list="topSubjectList"
    />
  </HomeBox>

  <HomeBox title="热门文章" href="/topic" more-text="全部文章" class="my-3">
    <TopicList
      :topic-list="topTopicList"
      :item-with-border="true"
      v-if="topTopicList && topTopicList.length > 0"
      class="space-y-4"
    />
  </HomeBox>
</template>
