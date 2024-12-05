<script setup lang="ts">
import markdownit from "markdown-it";
const md = markdownit();

defineProps<{ announcement: Announcement }>();
</script>

<template>
  <section class="space-y-4">
    <h1 class="text-lg text-center font-normal">{{ announcement.title }}</h1>
    <div
      v-html="md.render(announcement.content)"
      class="prose max-w-none bg-white p-6 rounded-md"
    ></div>
  </section>
</template>
