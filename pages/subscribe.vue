<script setup lang="ts"></script>

<template>
  <PageTitle icon="heroicons:building-storefront" title="订阅" />

  <ul
    class="flex flex-col-reverse justify-between lg:items-end mx-auto gap-y-4 lg:gap-y-0 lg:gap-x-4 lg:flex-row my-6 text-center 2xl:my-12 2xl:gap-x-6"
  >
    <li
      class="border bg-gradient-to-bl from-gray-100 to-gray-200 rounded-lg shadow-md p-4 space-y-1 lg:space-y-2 lg:w-1/3 hover:bg-gradient-to-br"
    >
      <div class="text-lg font-semibold lg:text-xl xl:text-2xl">游客</div>
      <div>HCaptcha 人机验证</div>
      <div>无需登录</div>
      <div>无在线时长</div>
      <div>不可查看付费专题</div>
      <div>无学习记录</div>
      <div>无积分</div>
      <div>不可投稿</div>
      <div>不可请求教程</div>
    </li>
    <li
      class="border bg-gradient-to-bl from-cyan-500 to-cyan-600 text-gray-100 rounded-lg shadow-md p-4 space-y-1 lg:space-y-2 lg:w-1/3 hover:bg-gradient-to-br"
    >
      <div class="text-lg font-semibold lg:text-xl xl:text-2xl">注册用户</div>
      <div>Turnstile 人机验证</div>
      <div>只能在一个设备上登录</div>
      <div>强制每次在线20分钟</div>
      <div>购买后可查看付费专题</div>
      <div>可回顾最后5条学习记录</div>
      <div>签到获取积分，积分可以用于兑换收费专题</div>
      <div>可进行投稿，稿件一旦接纳将获取积分奖励</div>
      <div>可请求教程，每次消耗一定量的积分</div>
      <div class="flex justify-center items-center gap-x-2 py-3">
        <div>
          <NuxtLink
            class="border bg-gray-200 px-1.5 py-0.5 lg:px-2.5 lg:py-1 text-gray-900"
            to="/register"
          >
            免费注册
          </NuxtLink>
        </div>
      </div>
    </li>
    <li
      class="border bg-gradient-to-bl from-cyan-600 to-cyan-800 text-gray-100 rounded-lg shadow-md p-4 space-y-1 lg:space-y-2 lg:w-1/3 hover:bg-gradient-to-br"
    >
      <div class="text-lg font-semibold lg:text-xl xl:text-2xl mb-3">
        订阅用户
      </div>
      <div>可关闭人机验证</div>
      <div>最多可在三个设备上登录</div>
      <div>最长可设置在线2小时</div>
      <div>特定收费专题免费查看；购买教程时享受折扣</div>
      <div>可回顾所有学习记录</div>
      <div>
        每次购买订阅赠送等比例积分、签到获取积分，积分可以用于兑换收费专题
      </div>
      <div>可进行投稿，稿件一旦接纳将获取积分奖励</div>
      <div>请求教程消耗的积分减半</div>
      <div class="flex justify-center items-center gap-x-2 py-3">
        <div
          class="flex justify-start items-center gap-x-1 bg-teal-100 border text-gray-900 px-1.5 py-0.5 text-sm lg:px-2.5 lg:py-1"
        >
          <img src="/usdt.svg" class="w-4 object-cover" />
          <span>1</span>
          <span>/30天</span>
        </div>
        <div>
          <button
            class="border bg-orange-600 text-white px-1.5 py-0.5 lg:px-2.5 lg:py-1"
          >
            订阅
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>
