<script setup lang="ts">
defineProps<{ hiddenSubject?: boolean; tryRead?: boolean }>();
</script>

<template>
  <li
    class="p-3 rounded border odd:bg-zinc-50 hover:bg-zinc-100 relative overflow-hidden"
  >
    <NuxtLink
      v-if="hiddenSubject !== true"
      class="absolute w-36 z-[1] top-7 -right-8 rotate-45 text-xs rounded-md bg-purple-900/70 text-gray-50 flex justify-start items-center gap-x-1 shrink-0 py-1 px-7 border shadow hover:bg-purple-900/90"
      :to="`/subject/mall`"
    >
      <Icon name="heroicons:newspaper" class="shrink-0" />
      <div class="grow truncate">漫游AXUM</div>
    </NuxtLink>

    <div
      v-if="tryRead === true"
      class="absolute w-32 z-[1] top-2 -right-11 rotate-45 text-xs rounded-md bg-orange-600/90 text-gray-50 flex justify-center items-center py-1 border shadow"
    >
      支持试读
    </div>

    <h3 class="grow lg:truncate">
      <NuxtLink
        class="text-lg font-semibold hover:text-red-800"
        :to="`/topic/db-derive/parse-derive`"
        >axum中的各种响应</NuxtLink
      >
    </h3>

    <div class="my-3">
      本章主要讨论 axum 的响应。axum 已经实现了多种响应，比如纯文本、HTML、JSON
      及 自定义响应头(response header)。除了这些 axum
      内置的响应之外，我们还将讨论如何将自己定义的结构体，作为响应返回给客户端。
    </div>

    <div class="text-xs flex justify-start items-center gap-x-2">
      <Icon name="heroicons:bookmark" class="shrink-0" />
      <ul class="flex justify-start items-center gap-x-1 shrink-0 flex-wrap">
        <li>
          <NuxtLink
            class="before:content-['#'] hover:underline decoration-dotted"
            >AXUM</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="before:content-['#'] hover:underline decoration-dotted"
            >response</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            class="before:content-['#'] hover:underline decoration-dotted"
            >响应</NuxtLink
          >
        </li>
      </ul>
    </div>
  </li>
</template>
