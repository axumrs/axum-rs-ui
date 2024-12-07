<script setup lang="ts">
import dayjs from "dayjs";

defineProps<{
  topic: TopicWithSubjectAndTagsAndSections;
}>();
const expendMeta = ref(false);
const toggleExpendMeta = () => {
  expendMeta.value = !expendMeta.value;
};
</script>

<template>
  <section class="flex flex-col justify-center items-center gap-y-3">
    <div class="flex justify-between items-center gap-x-1">
      <h1 class="text-3xl font-bold lg:text-4xl">{{ topic.title }}</h1>
      <Icon
        name="heroicons:chevron-down"
        class="text-gray-500 cursor-pointer transition-all duration-300"
        @click="toggleExpendMeta"
        :class="{ 'rotate-180': expendMeta }"
        size="1rem"
      />
    </div>
    <div
      class="text-xs text-gray-500 flex flex-col gap-y-1 transition-all duration-300 lg:flex-row lg:gap-x-2 lg:gap-y-0"
      :class="{
        'visible opacity-100 h-auto': expendMeta,
        'invisible opacity-0 h-0': !expendMeta,
      }"
      @click.self="toggleExpendMeta"
    >
      <!-- 查看、日期 -->
      <ul class="flex justify-center items-center gap-x-2">
        <li class="flex justify-start items-center gap-x-1">
          <Icon name="heroicons:eye" class="shrink-0" />
          <span>{{ topic.hit }}</span>
        </li>
        <li class="flex justify-start items-center gap-x-1 text-nowrap">
          <Icon name="heroicons:calendar" class="shrink-0" />
          <span>{{ dayjs(topic.dateline).format("YYYY-MM-DD HH:mm:ss") }}</span>
        </li>
      </ul>
      <!-- 标签 -->
      <div
        class="flex justify-center items-center gap-x-1"
        v-if="topic.tags && topic.tags.length > 0"
      >
        <Icon name="heroicons:bookmark" class="shrink-0" />
        <ul class="flex justify-start items-center gap-x-1 flex-wrap">
          <li v-for="t in topic.tags" :key="t.id">
            <NuxtLink
              class="before:content-['#'] hover:underline decoration-dotted"
              :to="`/tag/${t.name}`"
              >{{ t.name }}</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
