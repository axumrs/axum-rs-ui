<script setup lang="ts"></script>

<template>
  <li
    class="grid grid-cols-12 items-center gap-x-2 p-3 rounded-lg bg-zinc-100 hover:bg-zinc-200"
  >
    <div class="col-span-2 lg:col-span-1">
      <img
        src="https://file.axum.rs/icons/shop.png"
        class="w-10 object-cover"
      />
    </div>
    <div class="col-span-10 lg:col-span-11">
      <h3>
        <NuxtLink class="block w-full font-semibold hover:underline lg:text-lg"
          >使用axum打造你的分布式商城</NuxtLink
        >
      </h3>
      <div class="truncate">本专题将带你从零开始实现一个分布式B2C商城</div>
    </div>
  </li>
</template>
