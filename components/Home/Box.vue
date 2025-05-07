<script setup lang="ts">
defineProps<{
  tabs: HomeBoxTab[];
  currentTab: string;
  href: string;
  moreText: string;
}>();

const emits = defineEmits(["change"]);
</script>

<template>
  <div class="bg-white rounded-md border p-3 shadow-sm flex flex-col gap-y-3">
    <div class="flex justify-between items-center gap-x-2">
      <ClientOnly>
        <ul class="flex justify-start items-center gap-x-2">
          <li v-for="tab in tabs" :key="tab.key">
            <h5
              class="text-lg font-semibold lg:text-xl cursor-pointer"
              v-if="tab.key === currentTab"
              @click="emits('change', tab.key)"
            >
              {{ tab.title }}
            </h5>
            <h5
              v-else
              class="text-md text-gray-600 lg:text-lg cursor-pointer hover:text-gray-700"
              @click="emits('change', tab.key)"
            >
              {{ tab.title }}
            </h5>
          </li>
        </ul>
      </ClientOnly>
      <NuxtLink
        class="border rounded-full px-2 py-1 text-xs text-blue-600 border-blue-600"
        :to="href"
        >{{ moreText }}</NuxtLink
      >
    </div>

    <slot></slot>
  </div>
</template>
<!-- <template>
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
</template> -->
