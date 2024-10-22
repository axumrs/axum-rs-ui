<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const frm = reactive({
  captcha: "",
  nickname: "",
  password: "",
  re_password: "",
  email: "",

  invite: "",
});

const showSubmitCaptchaDialog = ref(false);

const { $post } = use$fetch();
const { $toast, $msg, $isLoading } = use$status();

const handleSubmit = async () => {
  if (frm.nickname.trim().length < 3 || frm.nickname.trim().length > 30) {
    $toast.value = "昵称长度应在3-30位之间";
    return;
  }
  if (frm.password.trim().length < 6) {
    $toast.value = "密码至少6位";
    return;
  }
  if (frm.password.trim() !== frm.re_password.trim()) {
    $toast.value = "两次密码输入不一致";
    return;
  }
  if (!frm.email.trim()) {
    $toast.value = "请输入邮箱";
    return;
  }
  if (frm.email.trim().length > 255) {
    $toast.value = "邮箱过长";
    return;
  }

  frm.captcha = "";
  showSubmitCaptchaDialog.value = true;
};

const handleRegister = async () => {
  await $post<string>(
    "/auth/register",
    { ...frm, captcha: frm.captcha },
    () => {
      showSubmitCaptchaDialog.value = false;
      $msg.value = "注册成功";
      $isLoading.value = false;
      return navigateTo(`/activation/${frm.email}`) as void;
    }
    // {
    //   ifErr(e) {
    //     $toast.value = e.message;
    //     showSubmitCaptchaDialog.value = false;
    //     frm.captcha = "";
    //   },
    // }
  );
};

watch(
  () => frm.captcha,
  (v) => {
    if (v) {
      // 提交注册
      handleRegister().then();
    }
  }
);
</script>

<template>
  <form
    autocomplete="off"
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-y-6 w-11/12 bg-white p-6 mx-auto rounded-lg my-12 lg:w-1/3 2xl:w-1/4 2xl:absolute 2xl:top-1/2 2xl:left-1/2 2xl:-translate-x-1/2 2xl:-translate-y-1/2"
  >
    <label class="flex flex-col gap-y-2">
      <div>昵称</div>
      <div class="border rounded px-3 py-2">
        <input
          type="text"
          class="block w-full outline-none"
          required
          v-model="frm.nickname"
        />
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>密码</div>
      <div class="border rounded px-3 py-2">
        <input
          type="password"
          class="block w-full outline-none"
          required
          v-model="frm.password"
        />
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>确认密码</div>
      <div class="border rounded px-3 py-2">
        <input
          type="password"
          class="block w-full outline-none"
          required
          v-model="frm.re_password"
        />
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>邮箱</div>
      <div class="border rounded px-3 py-2">
        <input
          type="email"
          class="block w-full outline-none"
          required
          v-model="frm.email"
        />
      </div>
    </label>

    <label class="flex flex-col gap-y-2">
      <div>邀请码</div>
      <div class="border rounded px-3 py-2">
        <input
          type="text"
          class="block w-full outline-none"
          v-model="frm.invite"
        />
      </div>
    </label>

    <label>
      <div>人机验证</div>
      <div data-required>
        <Captcha
          kind="HCaptcha"
          v-model="frm.captcha"
          @will-clear="frm.captcha = ''"
        />
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

  <Mask v-if="showSubmitCaptchaDialog" @click="showSubmitCaptchaDialog = false">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded shadow flex flex-col gap-y-2"
    >
      <div>请完成人机验证</div>
      <div data-required>
        <Captcha
          kind="HCaptcha"
          v-model="frm.captcha"
          @will-clear="frm.captcha = ''"
        />
      </div>
    </div>
  </Mask>
</template>
