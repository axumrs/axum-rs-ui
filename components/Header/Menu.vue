<script setup lang="ts">
const { $isValid, $user } = use$auth();
</script>

<template>
  <div class="group relative flex justify-end" v-if="$isValid">
    <div
      class="flex justify-center items-center gap-x-2 lg:cursor-pointer px-3 py-1.5 rounded-md bg-gray-100 group-hover:bg-gray-200"
    >
      <Icon name="lucide:user" size="1.2rem" />
      <div>{{ $user?.nickname || "" }}</div>
    </div>
    <ul
      class="absolute z-10 top-[2.3rem] right-0 bg-white shadow-md border rounded w-36 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-500 lg:w-44"
    >
      <li>
        <NuxtLink
          to="/user"
          class="flex justify-center items-center gap-x-2 p-3 hover:bg-gray-200"
        >
          <Icon name="heroicons:identification" size="1.5rem" />
          <span>个人中心</span>
        </NuxtLink>
      </li>
      <li class="">
        <NuxtLink
          to="/user/order"
          class="flex justify-center items-center gap-x-2 p-3 hover:bg-gray-200"
        >
          <Icon name="heroicons:credit-card" size="1.5rem" />
          <span>订单列表</span>
        </NuxtLink>
      </li>
      <li class="">
        <NuxtLink
          to="/user/purchased"
          class="flex justify-center items-center gap-x-2 p-3 hover:bg-gray-200"
        >
          <Icon name="heroicons:server" size="1.5rem" />
          <span>已购服务</span>
        </NuxtLink>
      </li>
      <li class="">
        <NuxtLink
          to="/user/history"
          class="flex justify-center items-center gap-x-2 p-3 hover:bg-gray-200"
        >
          <Icon name="heroicons:document-text" size="1.5rem" />
          <span>学习记录</span>
        </NuxtLink>
      </li>
      <li class="">
        <NuxtLink
          to="/user/profile"
          class="flex justify-center items-center gap-x-2 p-3 hover:bg-gray-200"
        >
          <Icon name="heroicons:user" size="1.5rem" />
          <span>个人信息</span>
        </NuxtLink>
      </li>
      <li class="">
        <NuxtLink
          to="/user/change-pwd"
          class="flex justify-center items-center gap-x-2 p-3 hover:bg-gray-200"
        >
          <Icon name="heroicons:key" size="1.5rem" />
          <span>修改密码</span>
        </NuxtLink>
      </li>
      <li class="">
        <NuxtLink
          to="/user/logout"
          class="flex justify-center items-center gap-x-2 p-3 hover:bg-gray-200"
        >
          <Icon name="heroicons:arrow-right-on-rectangle" size="1.5rem" />
          <span>退出登录</span>
        </NuxtLink>
      </li>
    </ul>
  </div>

  <ul class="flex justify-end items-center gap-x-0 lg:gap-x-4" v-else>
    <li>
      <NuxtLink
        class="block w-full h-full border rounded-2xl px-2 py-0.5 text-sm text-white/95 border-blue-700 bg-blue-600 lg:text-current lg:border-gray-200 lg:bg-transparent lg:hover:bg-gray-50 lg:px-3 lg:py-1 lg:text-base lg:rounded-full"
        to="/login"
        >登录</NuxtLink
      >
    </li>
    <li>
      <NuxtLink
        class="hidden w-full h-full border rounded-full px-3 py-1 text-white/95 border-blue-700 bg-blue-600 hover:bg-blue-700 lg:block"
        to="/register"
        >注册</NuxtLink
      >
    </li>
  </ul>
</template>
