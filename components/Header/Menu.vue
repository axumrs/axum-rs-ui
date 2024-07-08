<script setup lang="ts"></script>

<template>
  <ul class="flex justify-end items-center gap-x-0 lg:gap-x-4">
    <li>
      <NuxtLink
        class="block w-full h-full border rounded-2xl px-2 py-0.5 text-sm text-white/95 border-blue-700 bg-blue-600 lg:text-current lg:border-gray-200 lg:bg-transparent lg:hover:bg-gray-50 lg:px-3 lg:py-1 lg:text-base lg:rounded-full"
        >登录</NuxtLink
      >
    </li>
    <li>
      <NuxtLink
        class="hidden w-full h-full border rounded-full px-3 py-1 text-white/95 border-blue-700 bg-blue-600 hover:bg-blue-700 lg:block"
        >注册</NuxtLink
      >
    </li>
  </ul>
</template>
