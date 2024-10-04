<script setup lang="ts">
defineProps<{ title: string; href: string; moreText: string }>();
</script>

<template>
  <div class="bg-white rounded-md border p-3 shadow-sm flex flex-col gap-y-3">
    <div class="flex justify-start items-center gap-x-2">
      <h5 class="text-lg font-semibold lg:text-xl">{{ title }}</h5>

      <NuxtLink
        class="border rounded-full px-2 py-1 text-xs text-blue-600 border-blue-600"
        :to="href"
        >{{ moreText }}</NuxtLink
      >
    </div>

    <slot></slot>
  </div>
</template>
