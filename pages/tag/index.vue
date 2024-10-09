<script setup lang="ts">
const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);

const pm = ref<PaginationMeta>();
const tagList = ref<TagWitTopicCount[]>([]);

const { $get } = use$fetch();

const loadData = async () => {
  await $get<Pagination<TagWitTopicCount>>(
    "/user/tag",
    (v) => {
      if (v) {
        pm.value = v;
        tagList.value = v.data || [];
      }
    },
    { query: { page: page.value } }
  );
};
await loadData();
</script>

<template>
  <PageTitle title="标签" icon="heroicons:hashtag" />

  <section class="bg-white p-3 border rounded-lg my-4 2xl:p-6">
    <TagList :tagList="tagList" />
  </section>

  <Pagination class="justify-end my-3" :p="pm" v-if="pm" />
</template>
