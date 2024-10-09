<script setup lang="ts">
const r = useRoute();
const { page: pageParam } = r.query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);
const { name } = r.params;

const { $get } = use$fetch();

const tag = ref<TagWitTopicCount>();
const topicList = ref<TopicWithSubjectAndTags[]>([]);
const pm = ref<PaginationMeta>();
const loadData = async () => {
  await $get<{
    tag_with_topic_count: TagWitTopicCount;
    topic_paginate: Pagination<TopicWithSubjectAndTags>;
  }>(
    `/user/tag/${name.toString()}`,
    (v) => {
      if (v) {
        tag.value = v.tag_with_topic_count;
        topicList.value = v.topic_paginate.data || [];
        pm.value = v.topic_paginate;
      }
    },
    { query: { page: page.value } }
  );
};

await loadData();
</script>

<template>
  <PageTitle title="标签" icon="heroicons:hashtag" />

  <section class="flex flex-col justify-center items-center gap-y-2">
    <div class="flex justify-start items-center gap-x-1 text-3xl lg:text-4xl">
      <Icon name="heroicons:hashtag" />
      <h2 class="font-bold">{{ tag?.name || "" }}</h2>
    </div>
    <div class="flex justify-start items-center gap-x-1">
      <Icon
        name="heroicons:square-2-stack"
        class="text-gray-500 cursor-pointer transition-all duration-300"
      />
      <span>共有 {{ tag?.topic_count || 0 }} 篇文章</span>
    </div>
  </section>

  <section class="my-4">
    <TopicList
      :topic-list="topicList"
      :item-with-border="true"
      class="space-y-4"
    />
  </section>

  <Pagination class="justify-end my-3" :p="pm" v-if="pm" />
</template>
