<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const frm = reactive({ captcha: "" });

const { $post } = use$fetch();
const origin = ref("");

onMounted(async () => {
  await $post<any>(
    "https://httpbin.org/post",
    { foo: "张三" },
    (data) => {
      console.log("aaaa", data);

      return data;
    },
    { noLoading: false }
  );
});
</script>

<template>
  <div>{{ origin }}</div>
  <form
    class="bg-white rounded-md border absolute p-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-4 w-11/12 lg:w-1/4 lg:top-1/3 lg:-translate-y-1/3"
  >
    <label class="flex flex-col gap-y-2">
      <div>邮箱</div>
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
      <div>人机验证</div>
      <div data-required><Captcha kind="HCaptcha" v-model="frm.captcha" /></div>
    </label>

    <ul class="flex justify-between items-center gap-x-2">
      <li
        class="flex flex-col gap-y-1 justify-start items-start lg:flex-row lg:gap-x-2 lg:gap-y-0 lg:items-center"
      >
        <NuxtLink class="hover:text-red-600" to="/register"
          >注册新用户</NuxtLink
        >
        <NuxtLink class="hover:text-red-600" to="/reset-pwd">重置密码</NuxtLink>
      </li>
      <li>
        <button class="text-white bg-blue-600 px-4 py-2 rounded" type="submit">
          登录
        </button>
      </li>
    </ul>
  </form>
</template>
