<script setup lang="ts">
const props = defineProps<{
  topic: TopicWithSubjectAndTagsAndProtectedSections;
}>();
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const sections = computed(() => props.topic.sections);
const hasProtectdContents = ref(props.topic.protected.ids.length > 0);

const captch = ref("");
onMounted(() => {
  hljs.highlightAll();
});
</script>

<template>
  <div
    class="axum-topic-content prose max-w-none lg:prose-xl bg-white p-4 border rounded-md"
    v-html="sections.map((s) => s.content).join('\n')"
  ></div>

  <Mask v-if="hasProtectdContents" @click="hasProtectdContents = false">
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <div class="text-lg lg:text-xl font-semibold">
        要查看完整内容，请完成人机验证
      </div>
      <div>
        <Captcha :kind="topic.protected.catpcha" v-model="captch" />
      </div>
      <div class="lg:text-lg text-gray-500 cursor-default">
        <NuxtLink
          class="underline decoration-dashed hover:text-red-600 cursor-pointer"
          >升级为订阅用户</NuxtLink
        >，可关闭人机验证。
      </div>
    </div>
  </Mask>
</template>
