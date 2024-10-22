<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const frm = reactive({
  captcha: "",
  email: "",
  password: "",
  re_password: "",
  activation_code: "",
  activation_kind: "ResetPassword" as ActivationKind,
  submit_captcha: "",
});

const { $toast, $msg, $isLoading } = use$status();
const { $post } = use$fetch();

const showCaptchaDialog = ref(false);

const handleSubmit = () => {
  if (frm.password.trim().length < 6) {
    $toast.value = "密码至少6位";
    return;
  }
  if (frm.password !== frm.re_password) {
    $toast.value = "两次输入的密码不一致";
    return;
  }
  showCaptchaDialog.value = true;
};

watch(
  () => frm.submit_captcha,
  (v) => {
    if (v) {
      $post(
        "/auth/reset-pwd",
        { ...frm, captcha: v },
        () => {
          $msg.value = "密码重置成功";
          $isLoading.value = false;
          frm.captcha = "";
          return navigateTo("/login") as void;
        },
        {
          ifErr(e) {
            $toast.value = e.message;
            frm.captcha = "";
            $isLoading.value = false;
            showCaptchaDialog.value = false;
          },
        }
      ).then();
    }
  }
);
</script>

<template>
  <form
    autocomplete="off"
    class="bg-white rounded-md border absolute p-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-y-6 w-11/12 lg:w-1/4"
    @submit.prevent="handleSubmit"
  >
    <label class="flex flex-col gap-y-2">
      <div>邮箱</div>
      <EmailInput v-model="frm" :is-reset="true" />
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

    <label class="flex flex-col gap-y-2">
      <div>新密码</div>
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
      <div>确认新密码</div>
      <div class="border rounded px-3 py-2">
        <input
          type="password"
          class="block w-full outline-none"
          required
          v-model="frm.re_password"
        />
      </div>
    </label>

    <div class="flex justify-end">
      <button class="text-white bg-blue-600 px-4 py-2 rounded" type="submit">
        重置密码
      </button>
    </div>
  </form>

  <Mask v-if="showCaptchaDialog" @click="showCaptchaDialog = false">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded shadow flex flex-col gap-y-2"
    >
      <div>请完成人机验证</div>
      <div data-required>
        <Captcha kind="Turnstile" v-model="frm.submit_captcha" />
      </div>
    </div>
  </Mask>
</template>
