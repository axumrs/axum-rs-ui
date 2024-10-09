<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const props = defineProps<{
  topic: TopicWithSubjectAndTagsAndProtectedSections;
}>();

const sections = ref(props.topic.sections.map((s) => s.content));
const hasProtectdContents = ref(props.topic.protected.ids.length > 0);
const captcha = ref("");

const { $post } = use$fetch();
const { $msg } = use$status();
const loadProtectdContents = async () => {
  $post<ProtectedContent[]>(
    "/user/topic/protected-content",
    {
      topic_id: props.topic.id,
      ids: [...props.topic.protected.ids],
      captcha: captcha.value,
    },
    (v) => {
      if (v) {
        sections.value = props.topic.sections.map(
          (s) => v.find((p) => p.section_id === s.id)?.content || s.content
        );
        hasProtectdContents.value = false;
        const t = window.setTimeout(() => {
          hljs.highlightAll();
          $msg.value = "获取内容成功";
          window.clearTimeout(t);
        }, 100);
      }
    }
  );
  sections.value = [];
};

watch(
  () => captcha.value,
  (v) => {
    if (v) {
      loadProtectdContents().then();
    }
  }
);

onMounted(() => {
  hljs.highlightAll();
});
</script>

<template>
  <div
    class="axum-topic-content prose max-w-none lg:prose-xl bg-white p-4 border rounded-md my-3"
    v-html="sections.join('\n')"
  ></div>

  <Mask v-if="hasProtectdContents" @click="hasProtectdContents = false">
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <div class="text-lg lg:text-xl font-semibold">
        要查看完整内容，请完成人机验证
      </div>
      <div>
        <Captcha :kind="topic.protected.catpcha" v-model="captcha" />
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
