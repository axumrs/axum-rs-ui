<script setup lang="ts">
defineProps<{
  hiddenSubject?: boolean;
  topic: TopicWithSubjectAndTags;
  withBorder?: boolean;
}>();
</script>

<template>
  <li
    class="p-3 odd:bg-zinc-50/30 even:bg-white hover:bg-zinc-100 relative overflow-hidden"
    :class="{ 'rounded border': withBorder }"
  >
    <NuxtLink
      v-if="hiddenSubject !== true"
      class="absolute w-36 z-[1] top-7 -right-8 rotate-45 text-xs rounded-md bg-purple-900/70 text-gray-50 flex justify-start items-center gap-x-1 shrink-0 py-1 px-7 border shadow hover:bg-purple-900/90"
      :to="`/subject/${topic.subject_slug}`"
    >
      <Icon name="heroicons:newspaper" class="shrink-0" />
      <div class="grow truncate">{{ topic.name }}</div>
    </NuxtLink>

    <div
      v-if="topic.try_readable === true"
      class="absolute w-32 z-[1] top-2 -right-11 rotate-45 text-xs rounded-md bg-orange-600/90 text-gray-50 flex justify-center items-center py-1 border shadow"
    >
      支持试读
    </div>

    <h3 class="grow lg:truncate">
      <NuxtLink
        class="text-lg font-semibold hover:text-red-800"
        :to="`/topic/db-derive/parse-derive`"
        >{{ topic.title }}</NuxtLink
      >
    </h3>

    <div class="my-3">
      {{ topic.summary }}
    </div>

    <div class="text-xs flex justify-start items-center gap-x-2">
      <Icon name="heroicons:bookmark" class="shrink-0" />
      <ul class="flex justify-start items-center gap-x-1 shrink-0 flex-wrap">
        <li v-for="t in topic.tags" :key="t.id">
          <NuxtLink
            class="before:content-['#'] hover:underline decoration-dotted"
            :to="`/tag/${t.name}`"
            >{{ t.name }}</NuxtLink
          >
        </li>
      </ul>
    </div>
  </li>
</template>
