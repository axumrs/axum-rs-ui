<script setup lang="ts">
defineProps<{
  tabs: HomeBoxTab[];
  currentTab: string;
}>();
const emits = defineEmits(["change"]);
</script>

<template>
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
</template>
