<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const { email: emailRaw } = useRoute().params;

const frm = reactive({
  activation_code: "",
  email: emailRaw.toString(),
  captcha: "",
  submit_captcha: "",
  activation_kind: "Active" as ActivationKind,
});

const showSubmitCaptchaDialog = ref(false);

const handleSubmit = () => {
  showSubmitCaptchaDialog.value = true;
};

const { $post } = use$fetch();
const { $msg, $toast, $isLoading } = use$status();

const handleActivate = async () => {
  await $post(
    "/auth/active",
    {
      ...frm,
      captcha: frm.submit_captcha,
      kind: frm.activation_kind,
    },
    () => {
      $msg.value = "激活成功";
      frm.submit_captcha = "";
      $isLoading.value = false;
      return navigateTo("/login") as void;
    },
    {
      ifErr(e) {
        frm.submit_captcha = "";
        $toast.value = e.message;
        showSubmitCaptchaDialog.value = false;
      },
    }
  );
};

watch(
  () => frm.submit_captcha,
  (v) => {
    if (v) {
      // 提交
      handleActivate().then();
    }
  }
);
</script>

<template>
  <form
    autocomplete="off"
    @submit.prevent="handleSubmit"
    class="flex flex-col gap-y-6 w-11/12 bg-white p-6 mx-auto rounded-lg my-12 lg:w-1/3 2xl:w-1/4 2xl:absolute 2xl:top-1/2 2xl:left-1/2 2xl:-translate-x-1/2 2xl:-translate-y-1/2 border shadow-sm"
  >
    <label class="flex flex-col gap-y-2">
      <div>邮箱</div>

      <EmailInput v-model="frm" :readonly="true" />
    </label>
    <label class="flex flex-col gap-y-2">
      <div>邮箱验证码</div>
      <div class="border rounded px-3 py-2">
        <input
          type="text"
          class="block w-full outline-none"
          required
          v-model="frm.activation_code"
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
          提交
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
          kind="Turnstile"
          v-model="frm.submit_captcha"
          @will-clear="frm.submit_captcha = ''"
        />
      </div>
    </div>
  </Mask>
</template>
