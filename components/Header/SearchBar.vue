<script setup lang="ts">
const keyword = ref("");
const handleSearch = (e: Event) => {
  if (!keyword.value) {
    e.preventDefault();
    return false;
  }
  return true;
};
</script>

<template>
  <form
    class="flex flex-col w-full items-center"
    action="https://www.google.com/search"
    method="get"
    target="_blank"
    autocomplete="off"
    @submit="handleSearch"
  >
    <input type="hidden" name="q" value="site:axum.rs" />
    <div
      class="flex justify-start items-center gap-x-2 border rounded-full w-11/12 px-3 py-1.5 border-gray-200 text-gray-500 transition-all duration-300 focus-within:border-gray-300 focus-within:text-gray-600 focus-within:w-full focus-within:shadow-inner"
    >
      <Icon name="uil:search" class="shrink-0" size="1.25rem" />

      <input
        class="outline-none bg-transparent block w-full grow"
        type="text"
        name="q"
        v-model="keyword"
        placeholder="输入关键字，按回车进行搜索"
      />

      <button
        class="flex justify-center items-center flex-col h-full shrink-0"
        type="button"
        v-if="keyword"
        @click="keyword = ''"
      >
        <Icon name="uil:times" />
      </button>
    </div>
  </form>
</template>
