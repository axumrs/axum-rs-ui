<script setup lang="ts">
import { NuxtLink } from "#components";
defineProps<{ ifDisabled?: boolean; page: number }>();
</script>

<template>
  <component
    :is="ifDisabled ? 'button' : NuxtLink"
    :to="{ path: '', query: { page } }"
    :disabled="ifDisabled"
    class="flex flex-col items-center justify-center w-full px-1 py-0.5 bg-white border hover:bg-gray-100 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
  >
    <slot></slot>
  </component>
</template>
