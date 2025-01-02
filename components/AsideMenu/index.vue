<script setup lang="ts">
const { $token } = use$auth();
const { $count } = use$cart();
</script>

<template>
  <div class="flex flex-col divide-y">
    <ul class="flex flex-col justify-start items-start py-3">
      <AsideMenuItem icon="heroicons:newspaper" href="/subject"
        >专题</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:document-duplicate" href="/topic"
        >文章</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:hashtag" href="/tag">标签</AsideMenuItem>
      <!-- <AsideMenuItem icon="heroicons:document-arrow-up">投稿</AsideMenuItem> -->
      <AsideMenuItem icon="heroicons:building-storefront" href="/service"
        >服务</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:shopping-cart" href="/cart">
        <div class="relative">
          购物车
          <div
            v-if="$count > 0"
            class="absolute animate-bounce top-0 -right-3 w-4 h-4 rounded-full bg-red-500 text-[0.5rem] leading-none flex flex-col justify-center items-center text-white"
          >
            {{ $count > 99 ? "99+" : `${$count}` }}
          </div>
        </div>
      </AsideMenuItem>
    </ul>

    <ul class="flex flex-col justify-start items-start py-3">
      <AsideMenuItem icon="heroicons:bell-alert" href="/announcement"
        >公告</AsideMenuItem
      >

      <AsideMenuItem icon="heroicons:light-bulb" href="/about"
        >关于</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:heart" href="/donate">赞助</AsideMenuItem>
      <AsideMenuItem
        icon="heroicons:code-bracket-16-solid"
        href="https://dev.to/axum"
        new-window
        >博客</AsideMenuItem
      >
    </ul>
  </div>
</template>
