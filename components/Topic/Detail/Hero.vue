<script setup lang="ts">
const expendMeta = ref(false);
const toggleExpendMeta = () => {
  expendMeta.value = !expendMeta.value;
};
</script>

<template>
  <section class="flex flex-col justify-center items-center gap-y-3">
    <div class="flex justify-between items-center gap-x-1">
      <h1 class="text-lg font-semibold">解析 derive(Db)</h1>
      <Icon
        name="heroicons:chevron-down"
        class="text-gray-400 cursor-pointer transition-all duration-300"
        @click="toggleExpendMeta"
        :class="{ 'rotate-180': expendMeta }"
      />
    </div>
    <div
      class="text-xs text-gray-500 flex-col gap-y-1 transition-all duration-300"
      :class="{
        'visible opacity-100 h-auto': expendMeta,
        'invisible opacity-0 h-0': !expendMeta,
      }"
      @click="toggleExpendMeta"
    >
      <!-- 查看、日期 -->
      <ul class="flex justify-center items-center gap-x-2">
        <li class="flex justify-start items-center gap-x-1">
          <Icon name="heroicons:eye" />
          <span>10</span>
        </li>
        <li class="flex justify-start items-center gap-x-1">
          <Icon name="heroicons:calendar" />
          <span>2022-10-10 13:39:05</span>
        </li>
      </ul>
      <!-- 标签 -->
      <div class="flex justify-center items-center gap-x-1">
        <Icon name="heroicons:tag" />
        <ul class="flex justify-start items-center gap-x-1">
          <li>
            <NuxtLink
              class="before:content-['#'] hover:underline decoration-dotted"
              >axum</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="before:content-['#'] hover:underline decoration-dotted"
              >axum</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="before:content-['#'] hover:underline decoration-dotted"
              >axum</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              class="before:content-['#'] hover:underline decoration-dotted"
              >axum</NuxtLink
            >
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
