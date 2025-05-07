<script setup lang="ts">
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import type { VNodeRef } from "vue";

const props = defineProps<{
  topic: TopicWithSubjectAndTagsAndProtectedSections;
  promotion: Promotion;
}>();

const sections = ref(props.topic.sections.map((s) => s.content));
const hasProtectdContents = ref(props.topic.protected.ids.length > 0);
const needLogin = ref(props.topic.need_login);
const captcha = ref("");

const { $post } = use$fetch();
const { $msg } = use$status();
const fullPath = useRoute().fullPath;

const contentRef = ref<HTMLDivElement | null>();

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
  const t = setTimeout(() => {
    const p = `<div data-promotion-id="${props.promotion.id}"><a href="/promotion/${props.promotion.id}" target="_blank">${props.promotion.content}</a></div>`;
    if (contentRef.value) {
      const arr = contentRef.value.innerHTML.split("\n");

      const len = arr.length;
      let idx = Math.floor(Math.random() * len);
      let flag = false;
      while (true) {
        if (!/<\/[p|div]>$/.test(arr[idx])) {
          idx = Math.floor(Math.random() * len);
        } else {
          flag = true;
          break;
        }

        if (flag) break;
      }

      const contents: string[] = [];
      for (let i = 0; i < len; i++) {
        if (i === idx) {
          contents.push(p);
        }
        contents.push(arr[i]);
      }
      contentRef.value.innerHTML = contents.join("\n");
    }
    hljs.highlightAll();
    clearTimeout(t);
  }, 1);
});
</script>

<template>
  <div
    ref="contentRef"
    class="axum-topic-content prose max-w-none lg:prose-xl bg-white p-4 border rounded-md my-3"
    v-html="sections.join('\n')"
  ></div>

  <Mask v-if="needLogin" class="backdrop-blur-sm" @click="needLogin = false">
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <div class="">要查看完整内容，请先登录</div>
      <div
        class="lg:text-lg text-gray-500 cursor-default flex justify-center items-center gap-x-4"
      >
        <NuxtLink
          class="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
          :href="`/login?_r=${fullPath}`"
          >登录</NuxtLink
        >
        <NuxtLink
          class="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1 rounded-md"
          href="/register"
          >注册</NuxtLink
        >
      </div>
    </div>
  </Mask>

  <Mask
    class="backdrop-blur-sm"
    v-if="hasProtectdContents"
    @click="hasProtectdContents = false"
  >
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
          href="/service"
          >升级为订阅用户</NuxtLink
        >，可关闭人机验证。
      </div>
    </div>
  </Mask>
</template>
