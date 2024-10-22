<script setup lang="ts">
definePageMeta({
  layout: "auth",
});

const { email: emailRaw } = useRoute().params;
const { reset } = useRoute().query;

const isReset = computed(() => reset && reset.toString() === "1");

const rtc = useRuntimeConfig();

const receiver = isReset.value
  ? rtc.public.resetPasswordReceiver
  : rtc.public.activeReceiver;
const msg = isReset.value ? "重置你的密码" : "激活你的账号";
</script>

<template>
  <div
    class="flex flex-col gap-y-6 w-11/12 bg-white p-6 mx-auto rounded-lg my-12 lg:w-1/3 2xl:w-1/4 2xl:absolute 2xl:top-1/2 2xl:left-1/2 2xl:-translate-x-1/2 2xl:-translate-y-1/2 border shadow-sm"
  >
    <div>
      请使用你注册的邮箱<span
        class="underline underline-offset-8 decoration-dashed mx-1"
        >{{ emailRaw.toString() }}</span
      >发送邮件到
    </div>
    <div
      class="border-0 ring-1 ring-inset px-2.5 py-1.5 rounded-md bg-gray-50 text-center font-mono"
    >
      {{ receiver }}
    </div>
    <div>收到邮件后，我们将手动{{ msg }}。</div>
  </div>
</template>
