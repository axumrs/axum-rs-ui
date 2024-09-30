<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const frm = reactive({ captcha: "" });

const showCaptchaDialog = ref(false);

const handleSendEmailClick = () => {
  // TODO：检测邮箱是否合法
  showCaptchaDialog.value = true;
};
</script>

<template>
  <form
    autocomplete="off"
    class="flex flex-col gap-y-6 w-11/12 bg-white p-6 mx-auto rounded-lg my-6 lg:w-1/3 2xl:w-1/4 2xl:absolute 2xl:top-1/2 2xl:left-1/2 2xl:-translate-x-1/2 2xl:-translate-y-1/2"
  >
    <label class="flex flex-col gap-y-2">
      <div>昵称</div>
      <div class="border rounded px-3 py-2">
        <input type="email" class="block w-full outline-none" required />
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>密码</div>
      <div class="border rounded px-3 py-2">
        <input type="password" class="block w-full outline-none" required />
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>确认密码</div>
      <div class="border rounded px-3 py-2">
        <input type="password" class="block w-full outline-none" required />
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>邮箱</div>
      <div
        class="flex flex-col gap-y-2 lg:flex-row lg:gap-y-0 lg:gap-x-0 lg:border lg:rounded lg:overflow-hidden"
      >
        <input
          type="email"
          class="px-3 py-2 outline-none w-full border rounded lg:grow lg:w-auto lg:border-y-0 lg:border-l-0 lg:rounded-none"
          required
        />
        <button
          type="button"
          class="px-2 py-1 bg-gray-50 w-full text-sm border rounded lg:shrink-0 lg:w-auto lg:border-none lg:rounded-none lg:px-3 lg:py-2"
          @click="handleSendEmailClick"
        >
          发送验证码
        </button>
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>邮箱验证码</div>
      <div class="border rounded px-3 py-2">
        <input type="text" class="block w-full outline-none" required />
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>邀请码</div>
      <div class="border rounded px-3 py-2">
        <input type="text" class="block w-full outline-none" />
      </div>
    </label>

    <ul class="flex justify-between items-center gap-x-2">
      <li
        class="flex flex-col gap-y-1 justify-start items-start lg:flex-row lg:gap-x-2 lg:gap-y-0 lg:items-center"
      >
        <NuxtLink class="hover:text-red-600" to="/login">登录已有账号</NuxtLink>
      </li>
      <li>
        <button class="text-white bg-blue-600 px-4 py-2 rounded" type="submit">
          注册
        </button>
      </li>
    </ul>
  </form>

  <Mask v-if="showCaptchaDialog" @click="showCaptchaDialog = false">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded shadow flex flex-col gap-y-2"
    >
      <div>请完成人机验证</div>
      <div data-required>
        <Captcha kind="HCaptcha" v-model="frm.captcha" />
      </div>
    </div>
  </Mask>
</template>
