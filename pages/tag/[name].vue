<script setup lang="ts">
const { page: pageParam } = useRoute().query;
const page = computed(() => parseInt(pageParam?.toString() || "0", 10) || 0);
</script>

<template>
  <PageTitle title="标签" class="hidden lg:block" />

  <section class="flex flex-col justify-center items-center gap-y-2">
    <div class="flex justify-start items-center gap-x-1 text-3xl lg:text-4xl">
      <Icon name="heroicons:hashtag" />
      <h2 class="font-bold">过程宏</h2>
    </div>
    <div class="flex justify-start items-center gap-x-1">
      <Icon
        name="heroicons:square-2-stack"
        class="text-gray-500 cursor-pointer transition-all duration-300"
      />
      <span>共有 7 篇文章</span>
    </div>
  </section>

  <section class="my-3">
    <TopicList />
  </section>

  <Pagination
    class="justify-end my-3"
    :p="{ page, page_size: 30, total: 301, total_page: 11 }"
  />
</template>
