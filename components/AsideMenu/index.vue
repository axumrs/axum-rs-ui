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

    <ul class="flex flex-col justify-start items-start py-3" v-if="$token">
      <AsideMenuItem icon="heroicons:identification" href="/user"
        >个人中心</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:credit-card" href="/user/order"
        >订单列表</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:server" href="/user/purchased"
        >已购服务</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:document-text" href="/user/history"
        >学习记录</AsideMenuItem
      >
      <!-- <AsideMenuItem icon="heroicons:folder">随堂笔记</AsideMenuItem> -->
      <!-- <AsideMenuItem icon="heroicons:chat-bubble-bottom-center-text"
        >我的评论</AsideMenuItem
      > -->
      <!-- <AsideMenuItem icon="heroicons:document-check">已投稿件</AsideMenuItem> -->
      <!-- <AsideMenuItem icon="heroicons:link">我的邀请</AsideMenuItem> -->
      <AsideMenuItem icon="heroicons:user" href="/user/profile"
        >个人信息</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:key" href="/user/change-pwd"
        >修改密码</AsideMenuItem
      >
      <AsideMenuItem
        icon="heroicons:arrow-right-on-rectangle"
        href="/user/logout"
        >退出登录</AsideMenuItem
      >
    </ul>
    <ul class="flex flex-col justify-start items-start py-3" v-else>
      <AsideMenuItem icon="heroicons:user" href="/login">登录</AsideMenuItem>
      <AsideMenuItem icon="heroicons:user-plus" href="/register"
        >注册</AsideMenuItem
      >
    </ul>
    <ul class="flex flex-col justify-start items-start py-3">
      <AsideMenuItem icon="heroicons:bell-alert" href="/announcement"
        >公告</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:light-bulb" href="/about"
        >关于</AsideMenuItem
      >
      <AsideMenuItem icon="heroicons:heart" href="/donate">赞助</AsideMenuItem>
    </ul>
  </div>
</template>
