<script setup lang="ts"></script>

<template>
  <div class="bg-white rounded-md border p-3 shadow flex flex-col gap-y-3">
    <div class="flex justify-start items-center gap-x-2">
      <h5 class="text-lg font-semibold lg:text-xl">专题列表</h5>

      <NuxtLink
        class="border rounded-full px-2 py-1 text-xs text-blue-600 border-blue-600"
        >全部专题</NuxtLink
      >
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
