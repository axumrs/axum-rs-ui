<script setup lang="ts">
defineProps<{ readonly?: boolean; isReset?: boolean }>();
const modelValue = defineModel<{
  email: string;
  captcha: string;
  activation_kind: ActivationKind;
}>({
  required: true,
});

const { $post } = use$fetch();
const { $msg, $toast } = use$status();

const showCaptchaDialog = ref(false);
const showManualLink = ref(false);

const sendEmailValitionCodeCountDown = reactive({
  enable: false,
  count: 300,
});
const sendEmailValitionCodeCountDownTimer = ref<number>();

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
    "/auth/send-code",
    {
      email: modelValue.value.email,
      captcha: modelValue.value.captcha,
      kind: modelValue.value.activation_kind,
    },
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
  showManualLink.value = true;
};

const handleSendEmailClick = () => {
  if (!modelValue.value.email.trim()) {
    $toast.value = "请输入邮箱";
    return;
  }
  modelValue.value.captcha = "";
  showCaptchaDialog.value = true;
};

watch(
  () => modelValue.value.captcha,
  (v) => {
    if (v) {
      // 发送验证码
      sendEmailValitionCode().then();
    }
  },
  { deep: true }
);

onUnmounted(() => {
  window.clearInterval(sendEmailValitionCodeCountDownTimer.value);
});
</script>

<template>
  <div
    class="flex flex-col gap-y-2 lg:flex-row lg:gap-y-0 lg:gap-x-0 lg:border lg:rounded lg:overflow-hidden"
  >
    <input
      type="email"
      class="px-3 py-2 outline-none w-full border rounded lg:grow lg:w-auto lg:border-y-0 lg:border-l-0 lg:rounded-none"
      required
      v-model="modelValue.email"
      :readonly="readonly"
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
  <div class="text-sm text-gray-600" v-if="modelValue.email && showManualLink">
    <NuxtLink
      class="text-red-600"
      :to="{
        path: `/activation/${modelValue.email}/manual`,
        query: {
          reset: isReset ? '1' : undefined,
        },
      }"
      >无法收到验证码？</NuxtLink
    >
  </div>

  <Mask v-if="showCaptchaDialog" @click="showCaptchaDialog = false">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 border rounded shadow flex flex-col gap-y-2"
    >
      <div>请完成人机验证</div>
      <div data-required>
        <Captcha
          kind="HCaptcha"
          v-model="modelValue.captcha"
          @will-clear="modelValue.captcha = ''"
        />
      </div>
    </div>
  </Mask>
</template>
