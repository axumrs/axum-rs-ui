<script setup lang="ts">
defineProps<{ tag: TagWitTopicCount }>();
</script>

<template>
  <li class="">
    <NuxtLink
      class="w-full flex flex-col gap-y-3 justify-center items-center hover:scale-105 border p-4 rounded-lg bg-zinc-50 hover:bg-white/50 hover:border-gray-400 relative transition-all after:block after:absolute after:border-[2px] after:border-gray-200 after:border-l-0 after:border-t-0 after:rounded-lg after:-z-[0] after:w-full after:-bottom-1 after:-right-1 after:h-full hover:after:border-gray-300"
      :to="`/tag/${tag.name}`"
    >
      <h3 class="text-lg">{{ tag.name }}</h3>
      <div class="text-sm">共有 {{ tag.topic_count }} 篇文章</div>
    </NuxtLink>
  </li>
</template>
