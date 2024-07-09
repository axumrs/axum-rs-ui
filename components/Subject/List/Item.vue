<script setup lang="ts"></script>

<template>
  <li class="border rounded-md p-4 bg-white">
    <div class="grid grid-cols-12 items-start gap-x-2">
      <div class="col-span-3 lg:col-span-2">
        <img
          src="https://file.axum.rs/icons/shop.png"
          class="w-[5.5rem] object-cover"
        />
      </div>
      <div class="col-span-9 lg:col-span-10">
        <h3 class="mb-1">
          <NuxtLink class="text-lg font-semibold hover:text-red-800"
            >使用axum打造你的分布式商城</NuxtLink
          >
        </h3>
        <div>
          本专题将通过实现一个自动生成数据库 CRUD 的 Derive宏 来对过程宏
          `proc-macro` 进行一步步的探讨。我们希望通过本专题的学习，能让你掌握
          rust 过程宏的知识要点，并将其应用到实际开发中。
        </div>
      </div>
    </div>

    <SubjectMeta class="justify-end mt-3" />
  </li>
</template>
