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
  activation_code: "",
  invite: "",
  reg_captcha: "",
});

const showCaptchaDialog = ref(false);
const showSubmitCaptchaDialog = ref(false);
const sendEmailValitionCodeCountDown = reactive({ enable: false, count: 300 });
const sendEmailValitionCodeCountDownTimer = ref<number>();

const { $post } = use$fetch();
const { $toast, $msg, $isLoading } = use$status();

const handleSendEmailClick = () => {
  if (!frm.email.trim()) {
    $toast.value = "请输入邮箱";
    return;
  }
  frm.captcha = "";
  showCaptchaDialog.value = true;
};

const handleSendEmailValitionCodeCountDown = () => {
  if (sendEmailValitionCodeCountDown.count > 1) {
    sendEmailValitionCodeCountDown.enable = true;
    sendEmailValitionCodeCountDown.count--;
  } else {
    sendEmailValitionCodeCountDown.enable = false;
    sendEmailValitionCodeCountDown.count = 300;
    window.clearInterval(sendEmailValitionCodeCountDownTimer.value);
  }
};
const sendEmailValitionCode = async () => {
  await $post<any>(
    "/auth/register-send-code",
    { email: frm.email, captcha: frm.captcha },
    (data) => {
      handleSendEmailValitionCodeCountDown();
      sendEmailValitionCodeCountDownTimer.value = window.setInterval(() => {
        handleSendEmailValitionCodeCountDown();
      }, 1000);
      showCaptchaDialog.value = false;
      $msg.value = "验证码已发送至邮箱，请注意查收";
      return data;
    },
    {
      ifErr(e) {
        $toast.value = e.message;
        showCaptchaDialog.value = false;
      },
    }
  );
};

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
  if (frm.activation_code.trim().length !== 20) {
    $toast.value = "激活码错误";
    return;
  }

  frm.reg_captcha = "";
  showSubmitCaptchaDialog.value = true;
};

const handleRegister = async () => {
  await $post<string>(
    "/auth/register",
    { ...frm, captcha: frm.reg_captcha },
    () => {
      showSubmitCaptchaDialog.value = false;
      $msg.value = "注册成功";
      $isLoading.value = false;
      return navigateTo("/login") as void;
    },
    {
      ifErr(e) {
        $toast.value = e.message;
        showSubmitCaptchaDialog.value = false;
      },
    }
  );
};

onUnmounted(() => {
  window.clearInterval(sendEmailValitionCodeCountDownTimer.value);
});

watch(
  () => frm.captcha,
  (v) => {
    if (v) {
      // 发送验证码
      sendEmailValitionCode().then();
    }
  },
  { deep: true }
);

watch(
  () => frm.reg_captcha,
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
      <div
        class="flex flex-col gap-y-2 lg:flex-row lg:gap-y-0 lg:gap-x-0 lg:border lg:rounded lg:overflow-hidden"
      >
        <input
          type="email"
          class="px-3 py-2 outline-none w-full border rounded lg:grow lg:w-auto lg:border-y-0 lg:border-l-0 lg:rounded-none"
          required
          v-model="frm.email"
        />
        <button
          type="button"
          class="px-2 py-1 bg-gray-50 w-full text-sm border rounded lg:shrink-0 lg:w-auto lg:border-none lg:rounded-none lg:px-3 lg:py-2 disabled:bg-gray-100 disabled:cursor-not-allowed"
          @click="handleSendEmailClick"
          :disabled="sendEmailValitionCodeCountDown.enable"
        >
          <span v-if="!sendEmailValitionCodeCountDown.enable">发送验证码</span>
          <span v-else>等待{{ sendEmailValitionCodeCountDown.count }}秒</span>
        </button>
      </div>
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
      <div>邀请码</div>
      <div class="border rounded px-3 py-2">
        <input
          type="text"
          class="block w-full outline-none"
          v-model="frm.invite"
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

  <Mask v-if="showCaptchaDialog" @click="showCaptchaDialog = false">
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
  <Mask v-if="showSubmitCaptchaDialog" @click="showSubmitCaptchaDialog = false">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded shadow flex flex-col gap-y-2"
    >
      <div>请完成人机验证</div>
      <div data-required>
        <Captcha
          kind="Turnstile"
          v-model="frm.reg_captcha"
          @will-clear="frm.reg_captcha = ''"
        />
      </div>
    </div>
  </Mask>
</template>
