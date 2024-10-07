<script setup lang="ts">
const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);

const pm = ref<PaginationMeta>();
const topicList = ref<TopicWithSubjectAndTags[]>([]);

const { $get } = use$fetch();

const loadData = async () => {
  await $get<Pagination<TopicWithSubjectAndTags>>(
    "/user/topic",
    (v) => {
      if (v) {
        topicList.value = v.data || [];
        pm.value = v;
      }
    },
    { query: { page: page.value } }
  );
};

await loadData();
</script>

<template>
  <PageTitle title="文章" icon="heroicons:document-duplicate" />

  <TopicList
    class="my-4 space-y-4"
    :item-with-border="true"
    :topic-list="topicList"
  />

  <Pagination class="justify-end my-3" :p="pm" v-if="pm" />
</template>
