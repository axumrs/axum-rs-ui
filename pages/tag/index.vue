<script setup lang="ts">
const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);
</script>

<template>
  <PageTitle title="标签" icon="heroicons:hashtag" />

  <section class="bg-white p-3 border rounded-lg my-4">
    <TagList />
  </section>

  <Pagination
    class="justify-end my-3"
    :p="{ page, page_size: 30, total: 301, total_page: 11 }"
  />
</template>
