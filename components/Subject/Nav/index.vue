<script setup lang="ts">
defineProps<{ topicList: TopicWithSubjectAndTags[]; subject: Subject }>();
const expendTopicList = ref(false);
</script>

<template>
  <div class="relative">
    <div class="flex justify-center items-center gap-x-1 lg:justify-start">
      <NuxtLink
        class="flex justify-start items-center gap-x-1 hover:text-red-800"
        :to="`/subject/${subject.slug}`"
      >
        <img
          :src="
            `${subject.cover}` ||
            'https://file.axum.eu.org/icons/rust/rust-plain.svg'
          "
          class="w-6 object-cover"
        />
        <h2 class="text-lg font-normal lg:text-xl">
          {{ subject.name }}
        </h2>
      </NuxtLink>
      <Icon
        name="ion:caret-down-outline"
        class="w-4 object-cover cursor-pointer text-gray-500 transition-all duration-300 lg:hover:text-gray-800 lg:hover:scale-125"
        :class="{ 'rotate-180': expendTopicList }"
        size="0.75rem"
        @click="expendTopicList = !expendTopicList"
      />
    </div>
    <section
      class="absolute z-[1] left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-0 top-8 bg-zinc-50 w-11/12 h-96 overflow-y-auto shadow-md lg:w-3/4 border-4 border-zinc-200 transition-all duration-300"
      :class="{
        'invisible opacity-0': !expendTopicList,
        'visible opacity-100': expendTopicList,
      }"
    >
      <TopicList
        :hidden-subject="true"
        class="p-3 space-y-1"
        :topic-list="topicList"
        :item-with-border="true"
        :divide="false"
      />
    </section>
  </div>
</template>
