<script setup lang="ts">
defineProps<{
  topic: TopicWithSubjectAndTagsAndSections;
}>();
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

onMounted(() => {
  hljs.highlightAll();
});
</script>

<template>
  <div
    class="prose max-w-none lg:prose-xl bg-white p-4 border rounded-md"
    v-html="topic.sections.map((s) => s.content).join('\n')"
  ></div>
</template>
<style scoped>
.prose pre,
.prose-lg pre {
  padding: 1px !important;
  border-radius: 2px !important;
  background-color: rgb(209 213 219) !important;
}
</style>
